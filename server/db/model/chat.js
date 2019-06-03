/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-06-02 22:20:58
 * @LastEditTime: 2019-06-02 22:22:39
 */
const mongoose = require('mongoose');
const ChatSchema = require('./schema/chat');

const Chat = mongoose.model('chat',ChatSchema);

module.exports = Chat;