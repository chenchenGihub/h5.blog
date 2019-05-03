/*
 * @Description: 文章模型
 * @Author: chenchen
 * @Date: 2019-04-22 11:26:21
 * @LastEditTime: 2019-04-22 11:27:27
 */
const mongoose = require('mongoose')
const ArticleSchema = require('./schema/articel')

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
