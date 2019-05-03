/*
 * @Description: 用户原型
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-23 17:28:36
 */
const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const { USER_SCHEMA } = require('./schema.conf')

const UserSchema = new Schema({
  avatarUrl:USER_SCHEMA.avatarUrlType,
  userName: USER_SCHEMA.userNameType,
  email: USER_SCHEMA.emailType,
  password: USER_SCHEMA.passwordType,
  token: USER_SCHEMA.tokenType,
  device: USER_SCHEMA.deviceType,
  ip: USER_SCHEMA.ipType,
  article:USER_SCHEMA.articleType,
  fans:USER_SCHEMA.fansType,
  role:USER_SCHEMA.roleType
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})


module.exports = UserSchema
