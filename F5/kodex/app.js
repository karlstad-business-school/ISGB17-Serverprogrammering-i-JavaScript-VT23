'use strict';
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(3001, function(){
    console.log('Tjo!');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', function(req,res) {
    res.sendFile(__dirname + '/favicon.ico');
});

app.use('/banan', express.static(__dirname + '/clientscripts'));

io.on('connection', (socket)=> {
    console.log('Ny användare anslöt...');

    socket.on('finafisken', (data)=> {
        console.log(data);
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        io.emit('newcolor', {'red' : r, 'green': g, 'blue': b});
    });

});



