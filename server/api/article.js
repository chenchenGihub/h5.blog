/*
 * @Description: 博客文章api
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-23 16:20:28
 */

const { Router } = require('express');
const router = Router()
const { auths } = require('../middleware/auth')
const Article = require('../db/model/article');
const User = require('../db/model/user');

const log4js = require('log4js');
// const log4js = require('../log/log');


const {
    errorCode,
    errorMsg
} = require('../error.conf')

router.all("/article", auths)

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

    let articles, total;

    try {
        articles = await Article.find({}, null, { skip: +skip, limit: +count });
        total = await Article.countDocuments();

    } catch (error) {
        console.log(error);

    }



    res.json({
        success: false,
        data: { articles, total },
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
    article.authorId = req.body.id;
    article.title = req.body.title;
    article.text = req.body.text;
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
    const { id } = req.query;
    let article,user,authorId;
    try {
        article = await Article.findById(id,"title text html authorId");

        if (!article) {
           return res.json({
                success:false,
                data:null,
                code:errorCode.ARTICEL_NOT_EXSIT,
                msg:errorMsg.ARTICEL_NOT_EXSIT
            })
        }

       if (article.authorId) {
          
           
           user = await User.findById({_id:article.authorId})
       }

     
       

    } catch (error) {

        console.log(error);
        

        res.json({
            success:false,
            data:null,
            code:errorCode.DATABASE_ERROR,
            msg:errorMsg.DATABASE_ERROR
        })
    }

    res.json({
        success:true,
        data:{
            title:article.title,
            text:article.text,
            html:article.html,
            author:user.userName,
            avatarUrl:user.avatarUrl,
        },
        code:null,
        msg:null
    })
})

module.exports = router