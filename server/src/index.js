const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = require('./router');
const reload = require('../reload/reload');

// static files
app.use(express.static('public'));
app.use(express.static('reload'));

// config routes
router(app);

// default events are connect/disconnect
io.on('connect', function(socket){
    socket.emit('connected', socket.id);
    console.log('a user connected, whose id is ', socket.id);
    socket.on('message', function(msg){
        console.log('user whose id is ', socket.id, ' sent a message: ', msg);
        io.emit('message', {id:socket.id, msg});
        console.log('send all people: ', msg);
    })
});

reload(app);

http.listen(80, function(){
    console.log('listening on *:80');
});