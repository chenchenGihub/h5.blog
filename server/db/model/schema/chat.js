/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-06-02 22:15:53
 * @LastEditTime: 2019-06-02 22:20:27
 */
const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const ChatSchema = new Schema({
    chat_id:String,
    from:{
        id:String,
        avatar:String,
        nickName:String
    },
    to:{
        id:String,
        avatar:String,
        nickName:String
    },
    word:String
});

module.exports = ChatSchema;