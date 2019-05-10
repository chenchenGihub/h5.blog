/*
 * @Description: 评论api
 * @Author: chenchen
 * @Date: 2019-04-24 22:15:40
 * @LastEditTime: 2019-05-10 00:11:42
 */
const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router()
const { auths } = require('../middleware/auth')
const Article = require('../db/model/article');
const User = require('../db/model/user');
const Comment = require('../db/model/comment');


const {
    errorCode,
    errorMsg
} = require('../error.conf')

router.all("/comment", auths)

router.post('/comment', async (req, res, next) => {


    let { textValue, articleId, userId } = req.body;


    let data, user, author;
    try {
        const comment = new Comment;
        comment.articleId = articleId;
        comment.comment = textValue;
        comment.user.userId = userId;

        if (userId) {
            user = await User.findById({ _id: userId });
            author = await Article.findById({ _id: articleId }, "user");

            console.log(author.user.id, userId);

        }

        if (user) {
            comment.user.userName = user.userName;
            comment.user.avatar = user.avatarUrl;
            comment.user.isAuthor = author.user.id === userId;
        }

        data = await comment.save();

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            data: null,
            code: errorCode.DATABASE_ERROR,
            msg: errorMsg.DATABASE_ERROR
        })
    }


    res.json({
        success: true,
        data: null,
        code: null,
        msg: null
    })
})


router.get('/commentlist', async (req, res, next) => {
    let { articleId } = req.query;

    let doc;
    try {
        doc = await Comment.find({ articleId: articleId });

        if (!doc) {
            return res.json({
                success: false,
                data: doc,
                code: errorCode.NOT_EXSIT,
                msg: errorMsg.NOT_EXSIT
            })
        }

    } catch (error) {
        res.json({
            success: false,
            data: null,
            code: errorCode.DATABASE_ERROR,
            msg: errorMsg.DATABASE_ERROR
        })
    }


    res.json({
        success: true,
        data: doc,
        code: null,
        msg: null
    })

})

router.put('/reply', async (req, res, next) => {
    let { parentcommentid, userId, replytouserid, comment,reply_to_comment,type } = req.body;

    let cdoc, isFloorOwner = false, isAuthor = false, commentTxt, subCommentdoc;

    try {

        cdoc = await Comment.findById({ _id: parentcommentid });
        article_doc = await Article.findById({ _id: cdoc.articleId });

        udoc = await User.findById({ _id: userId });
        rudoc = await User.findById({ _id: replytouserid });

        if (!cdoc || !udoc) {
            return res.json({
                success: false,
                data: null,
                code: errorCode.NOT_EXSIT,
                msg: errorMsg.NOT_EXSIT
            })
        }

        commentTxt = type ? `${reply_to_comment} <strong style="color:#000">//</strong> <a href="javascript:;" @click="goUser(${rudoc._id})">@${rudoc.userName}</a>:${comment}` : comment

        console.log(article_doc.user.id, cdoc.user.userId, userId);


        if (article_doc.user.id === userId) {
            isAuthor = true
        }

        if (cdoc.user.userId === userId) {
            isFloorOwner = true
        }


        let childComment = {
            user_from: {
                userId: udoc._id,
                userName: udoc.userName,
                avatar: udoc.avatarUrl,
                isAuthor: isAuthor,
                isFloorOwner: isFloorOwner,
            },
            parentcommentid: parentcommentid,
            user_to: replytouserid,
            commentTxt: commentTxt,
            comment: comment
        }


        cdoc.children_comment.push(childComment)

        subCommentdoc = cdoc.children_comment[0];

        // console.log(subCommentdoc,subCommentdoc.isNew) 


        ress = await cdoc.save();




    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            data: null,
            code: errorCode.DATABASE_ERROR,
            msg: errorMsg.DATABASE_ERROR
        })
    }


    res.json({
        success: true,
        data: {
            comment: {
                commentTxt: commentTxt,
                comment: subCommentdoc.comment,
                createTime: subCommentdoc.createAt,
                parentCommentId: parentcommentid,
                id: subCommentdoc._id,
                isFloorOwner: isFloorOwner,
                isAuthor: isAuthor,
            }
        },
        code: null,
        msg: null
    })

})

module.exports = router