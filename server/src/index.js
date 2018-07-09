const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = require('./router');
const reload = require('../reload/reload');
// const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// static files
app.use(express.static('public'));
app.use(express.static('reload'));

// app.use(expressJWT({secret:'asdf'}).unless({path:['/loginRequest']}));

// resole request
app.use(bodyParser.json());

// resolve cookie
app.use(cookieParser());

app.use((req, res, next)=>{
    if (['/loginRequest'].includes(req.path)) { //登录不拦截
        console.log('是loginRequest');
        next();
    }else{
        const token = req.cookies.c;
        console.log('不是loginRequest--', req.cookies, token);
        jwt.verify(token, 'ddddd', (err, decodedToken)=>{
            console.log('验证----', err, decodedToken)
            if (err) {
                console.log('验证不通过');
                return res.sendStatus(401);
            }else{
                console.log('验证通过');
                next();
            }
        });
    }
})

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