/*
 * @Description: 评论api
 * @Author: chenchen
 * @Date: 2019-04-24 22:15:40
 * @LastEditTime: 2019-05-29 20:02:28
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

    console.log(io);
    

    io.on('connection', function (socket) {
        console.log('someone connected');
        setInterval(function () { socket.emit('date', { 'date': new Date() }, 1000); })
    })


    let data, user, author;
    try {
        const comment = new Comment;
        comment.articleId = articleId;
        comment.comment = textValue;
        comment.user.userId = userId;

        if (userId) {
            user = await User.findById({ _id: userId });
            author = await Article.findById({ _id: articleId }, "user");
        }

        if (user) {
            comment.user.userName = user.userName;
            comment.user.avatar = user.avatarUrl;
            comment.user.isAuthor = author.user.id === userId;
        }

        data = await comment.save();

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
        data: null,
        code: null,
        msg: null
    })
})


router.get('/commentlist', async (req, res, next) => {

    let { articleId, userId } = req.query;
    let docs, user, isLike = false, votedCounts;

    try {

        docs = await Comment.find({ articleId: articleId });

        for (let doc of docs) {

            user = doc.voted.id(userId);

            if (user) {
                doc.isLike = true
            }

            doc.votedCounts = doc.voted.length;

            for (let cdoc of doc.children_comment) {

                user = cdoc.voted.id(userId);

                if (user) {
                    cdoc.isLike = true
                }

                cdoc.votedCounts = cdoc.voted.length;
            }

        }



        if (!docs) {
            return res.json({
                success: false,
                data: null,
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
        data: docs,
        code: null,
        msg: null
    })

})

router.put('/reply', async (req, res, next) => {
    let { parentcommentid, userId, replytouserid, comment, reply_to_comment, type } = req.body;

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

        commentTxt = type ? `${comment} <strong style="color:#000">//</strong><a href="javascript:;" @click="goUser(${rudoc._id})">@${rudoc.userName}</a>:${reply_to_comment}` : comment

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



        ress = await cdoc.save();




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

router.put('/toggleclike', async (req, res, next) => {


    let { commentId, userId } = req.body;
    let cdoc, udoc, isLike = false, votes;

    cdoc = await Comment.findById({ _id: commentId });

    if (cdoc.voted.id(userId)) {
        cdoc.voted.pull(userId)
    } else if (userId) {
        cdoc.voted.push(userId)
        subCommentdoc = cdoc.voted[0];
        isLike = true
    }

    ress = await cdoc.save();

    res.json({
        success: true,
        errorCode: null,
        errorMsg: null,
        data: {
            isLike
        }
    })
})

router.put('/togglecchildlike', async (req, res, next) => {



    let { commentId,
        child_c_id,
        userId } = req.body;

    let cdoc;

    cdoc = await Comment.findById({ _id: commentId });



    if (cdoc.children_comment.id(child_c_id).voted.id(userId)) {
        cdoc.children_comment.id(child_c_id).voted.id(userId).remove();
        isLike = false;
    } else {
        cdoc.children_comment.id(child_c_id).voted.push(userId)
        cdoc.children_comment.id(child_c_id).voted[0];
        isLike = true
    }

    try {
        ress = await cdoc.save();
        res.json({
            success: true,
            errorCode: null,
            errorMsg: null,
            data: {
                isLike
            }
        });

    } catch (error) {

        res.json({
            success: false,
            errorCode: errorCode.DATABASE_ERROR,
            errorMsg: errorMsg.DATABASE_ERROR,
            data: null
        });

    }





})

module.exports = router