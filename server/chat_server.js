/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-29 23:01:22
 * @LastEditTime: 2019-05-29 23:07:48
 */
const socketio = require('socket.io')

global.io = null;

exports.listen = (server) => {
    io = socketio.listen(server);
    io.on("connection", (socket) => {
        console.log('connect', socket.id);
        socket.on("data", (data) => {

        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

    })
}


