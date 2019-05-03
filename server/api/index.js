/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-10 18:50:38
 * @LastEditTime: 2019-04-25 22:41:21
 */
const { Router } = require('express');
const router = Router()

const article = require('./article')
const user = require('./user')
const comment = require('./comment')



router.use(article)
router.use(user)
router.use(comment)


module.exports = router