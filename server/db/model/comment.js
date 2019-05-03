/*
 * @Description: 评论模型
 * @Author: chenchen
 * @Date: 2019-04-24 22:16:31
 * @LastEditTime: 2019-04-24 23:22:39
 */
const mongoose = require('mongoose')
const CommentSchema = require('./schema/comment')

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
