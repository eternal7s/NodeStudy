const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, {path: '/socket.io'});

    app.set('io', io);

    const room = io.of('/room');
    const chat = io.of('/chat');

    io.use((socket, next) => {
        cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    room.on('connection', (socket) => { // 웹 소켓 연결 시
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => { // 연결 종료 시
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        const req = socket.request;
        const {headers: {referer}} = req;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
        console.log('chat 네임스페이스에 접속', ip, roomId);
        socket.join(roomId);

        socket.to(roomId).emit('join', {
            user: 'system',
            chat: `${req.session.color}님이 입장하셨습니다.`
        });

        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제', ip, roomId, socket.id);
            socket.leave(roomId);
            const currentRoom = socket.adapter.rooms[roomId];
            const userCount = currentRoom ? currentRoom.length : 0;
            if (userCount === 0) { // 접속자가 0명이면 방 삭제
                const signedCookie = req.signedCookies['connect.sid'];
                const connectSID = cookie.sign(signedCookie, process.env.COOKIE_SECRET);
                axios.delete(`http://localhost:8005/room/${roomId}`, {
                    headers: {Cookie: `connect.sid=s%3A${connectSID}`}
                })
                    .then(() => {
                        console.log('방 제거 요청 성공');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${req.session.color}님이 퇴장하셨습니다.`
                });
            }
        });
    });
};