/*
 * @Description: 评论api
 * @Author: chenchen
 * @Date: 2019-04-24 22:15:40
 * @LastEditTime: 2019-04-29 08:53:26
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
    let data, user;

    try {
        const comment = new Comment;
        comment.articleId = articleId;
        comment.comment = textValue;
        comment.user.userId = userId;

        if (userId) {
            user = await User.findById({ _id: userId })
        }

        if (user) {
            comment.user.userName = user.userName;
            comment.user.avatar = user.avatarUrl;
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
    let { parentcommentid, user, replytouserid, comment } = req.body;


    let doc, replydata,commentid,isFloorOwner=false,isAuthor=false;
    try {
        doc = await Comment.findById({ _id: parentcommentid });

        if (!doc) {
            return res.json({
                success: false,
                data: null,
                code: errorCode.NOT_EXSIT,
                msg: errorMsg.NOT_EXSIT
            })
        }

        if (doc.user.userId===user.userId) {
            isFloorOwner = true
        }


        const { authorId } =  await Article.findOne({articleId:doc.articleId});

        if (user.articleId===authorId) {
            
        }

        commentid = mongoose.Types.ObjectId();

        replydata = {
            parentcommentid: parentcommentid,
            commentid: commentid,
            user: {
                userId:user.userId,
                userName:user.userName,
                avatar:user.avatar,
            },
            replytouserid: replytouserid,
            comment: comment
        }

        const res = await Comment.updateOne({ _id: doc._id }, {
            $set: {
                replydata: doc.replydata.push(replydata)
            }
        })

        const ress = await doc.save();

        

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
                content: "哈哈哈",
                createTime: Date.now,
                id: commentid,
                isFloorOwner: isFloorOwner,
                isAuthor: isAuthor,
            }
        },
        code: null,
        msg: null
    })

})

module.exports = router