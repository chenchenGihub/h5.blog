/*
 * @Description: 博客文章api
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-05-26 23:30:34
 */

const { Router } = require('express');
const router = Router()
const { auths } = require('../middleware/auth')
const Article = require('../db/model/article');
const User = require('../db/model/user');
const Comment = require('../db/model/comment');
const Cache = require('../utils/cache')

const log4js = require('log4js');
// const log4js = require('../log/log');


const {
    errorCode,
    errorMsg
} = require('../error.conf')

// router.all("/article", auths)

router.get('/article', async (req, res, next) => {




    log4js.configure({
        appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
        categories: { default: { appenders: ['cheese'], level: 'error' } }
    });

    const logger = log4js.getLogger('cheese');
    logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Comté.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');


    let { skip, count } = req.query;

    let articles, total,hasMore=true;

    try {
        if (+skip === 0) {
            Cache.set("refresh_time", Date.now())
            articles = await Article.find({}, null, { skip: +skip, limit: +count });
        } else {
            let rt = await Cache.get("refresh_time");

            articles = await Article.find({
                createdAt: {
                    $lte: +rt
                }
            }, null, { skip: +skip, limit: +count });
        }

        total = await Article.countDocuments();

    } catch (error) {
        console.log(error);

    }

    console.log(articles);
    if (articles.length===0) {
        hasMore = false
    }

    res.json({
        success: true,
        data: { articles, total,hasMore },
        errorCode: null,
        errorMsg: null,
    })

})

router.post("/publishArticle", async (req, res, next) => {
    let user, article;


    try {
        user = await User.findById(req.body.id);

        if (!user) {
            res.json({
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
            code: errorCode.NOT_EXSIT,
            msg: errorMsg.NOT_EXSIT
        })
    }

    article = new Article;
    article.user.id = req.body.id;
    article.user.name = user.userName;
    article.user.avatar = user.avatarUrl;
    article.user.description = user.description;
    article.title = req.body.title;
    article.text = req.body.text;
    article.imgs = req.body.imgs;
    article.html = req.body.html;

    try {

        let data = await article.save();

        if (!data) {

            res.json({
                success: false,
                data: null,
                code: errorCode.ARTICEL_NOT_EXSIT,
                msg: errorMsg.ARTICEL_NOT_EXSIT
            })

        } else {

            res.json({
                success: true,
                data: null,
                code: null,
                msg: null
            })

        }

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            data: null,
            code: errorCode.DATABASE_ERROR,
            msg: errorMsg.DATABASE_ERROR
        })

    }


})


router.get('/getSingleArticle', async (req, res, next) => {
    const { id, userId } = req.query;



    let article, user, isLike = false, comment_counts, comment_doc, children_comment_count = 0;
    try {

        article = await Article.findById(id, "title text html user votes");

        let votesDoc = await article.votes.id(userId);

        comment_doc = await Comment.find({ articleId: id });

        for (let comment of comment_doc) {

            children_comment_count += comment.children_comment.length

        }

        comment_counts = comment_doc.length + children_comment_count;


        if (votesDoc) {
            isLike = true
        }

        if (!article) {
            return res.json({
                success: false,
                data: null,
                code: errorCode.ARTICEL_NOT_EXSIT,
                msg: errorMsg.ARTICEL_NOT_EXSIT
            })
        }



        if (article.user.id) {

            user = await User.findById({ _id: article.user.id }, "_id avatarUrl userName description");

        }


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
            title: article.title,
            text: article.text,
            html: article.html,
            author: user,
            voteCounts: article.votes.length,
            isLike,
            comment_counts
        },
        code: null,
        msg: null
    })
})

router.put('/togglelike', async (req, res, next) => {

    let { articleId, userId } = req.body;

    const articleDoc = await Article.findById({ _id: articleId });

    let votesDoc = await articleDoc.votes.id(userId);



    if (votesDoc) {
        articleDoc.votes.id(userId).remove()
    } else if (userId) {
        articleDoc.votes.push(userId)
        votesdoc = articleDoc.votes[0];
    }

    await articleDoc.save()


    res.json({
        success: true,
        data: { isLike: !votesDoc }
    })
})

module.exports = router