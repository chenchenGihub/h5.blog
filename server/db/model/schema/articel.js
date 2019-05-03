/*
 * @Description: 文章原型
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-23 17:30:49
 */
const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const {
  ARTICEL_SCHEMA
} = require('./schema.conf')

const ArticelSchema = new Schema({
  authorId: { type: String },
  title: ARTICEL_SCHEMA.titleType,
  text: ARTICEL_SCHEMA.contentType,
  html: ARTICEL_SCHEMA.htmlType,
  hidden: ARTICEL_SCHEMA.hiddenType,
  meta: {
    votes: [Schema.Types.ObjectId],
    favs: [Schema.Types.ObjectId],
    comments: [{ body: String, date: Date }],
  }
}, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  })


module.exports = ArticelSchema
