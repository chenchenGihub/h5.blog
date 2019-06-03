/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-29 23:01:22
 * @LastEditTime: 2019-06-02 23:04:23
 */
const socketio = require('socket.io');
const Chat = require('./db/model/chat')
const User = require('./db/model/user')

global.io = null;

exports.listen = (server) => {
    io = socketio.listen(server);
    io.on("connection", (socket) => {
        console.log('connect', socket.id);
        socket.on("sendWord", async (data) => {

            let { from, to, msg } = data;

            console.log(from,to);
            

            let user_from_doc = await User.findById(from, 'userName avatarUrl');
            let user_to_doc = await User.findById(to, 'userName avatarUrl');

            const chat = new Chat;

            chat.from.nickName = user_from_doc.userName;
            chat.from.avatar = user_from_doc.avatarUrl;
            chat.from.id = user_from_doc._id;

            chat.to.nickName = user_to_doc.userName;
            chat.to.avatar = user_to_doc.avatarUrl;
            chat.to.id = user_to_doc._id;

            chat.chat_id = [from, to].sort().join("_");

            chat.word = msg;

            let res = await chat.save();


            socket.broadcast.emit('receiveMsg', {
                from: from,
                to: to,
                word: msg
            })

        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

    })
}


