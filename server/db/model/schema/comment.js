/*
 * @Description: 用户原型
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-26 11:59:35
 */
const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const { COMMENT_SCHEMA } = require('./schema.conf')

const CommentSchema = new Schema({
  articleId:COMMENT_SCHEMA.articleType,
  ip:COMMENT_SCHEMA.ipType,
  device:COMMENT_SCHEMA.deviceType,
  user:COMMENT_SCHEMA.userType,
  comment:COMMENT_SCHEMA.commentType,
  replydata:COMMENT_SCHEMA.replydataType,
  voted:COMMENT_SCHEMA.votedType
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})


module.exports = CommentSchema
