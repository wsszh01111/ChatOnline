const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('reload'));

app.get('/', function(req, res){
    console.log('url---', req.url)
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

http.listen(80, function(){
    console.log('listening on *:80');
});