/*
 * @Description: 用户原型
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-05-09 23:48:02
 */
const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const { COMMENT_SCHEMA } = require('./schema.conf')

const CommentSchema = new Schema({
  // parentCommentId:COMMENT_SCHEMA.commentIdType,
  articleId:COMMENT_SCHEMA.articleType,
  ip:COMMENT_SCHEMA.ipType,
  device:COMMENT_SCHEMA.deviceType,
  user:COMMENT_SCHEMA.userType,
  // replytouserid:COMMENT_SCHEMA.replytouseridType,
  comment:COMMENT_SCHEMA.commentType,
  // commentTxt:COMMENT_SCHEMA.commentTxtType,
  children_comment:[COMMENT_SCHEMA.children_comment_type],
  voted:COMMENT_SCHEMA.votedType
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})


module.exports = CommentSchema
