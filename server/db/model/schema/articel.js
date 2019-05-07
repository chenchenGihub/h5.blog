/*
 * @Description: 文章原型
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-05-07 09:46:19
 */
const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const {
  ARTICEL_SCHEMA
} = require('./schema.conf')

const ArticelSchema = new Schema({
  user: {
    id:String,
    name:String,
    avatar:String,
    description:String
   },
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
