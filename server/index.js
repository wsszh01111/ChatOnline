const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    console.log('url---', req.url)
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

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

http.listen(80, function(){
    console.log('listening on *:80');
});