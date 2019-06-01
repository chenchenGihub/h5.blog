/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-29 23:01:22
 * @LastEditTime: 2019-06-01 17:13:56
 */
const socketio = require('socket.io')

global.io = null;

exports.listen = (server) => {
    io = socketio.listen(server);
    io.on("connection", (socket) => {
        console.log('connect', socket.id);
        socket.on("data", (data) => {

            console.log(data);


            socket.broadcast.emit('hi', { a: 1 })

        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

    })
}


