'use strict';
const fs = require('fs');
const http = require('http');
const uc = require('upper-case');

http.createServer(function(req, res){
    console.log('tjo!');
    let content = fs.readFileSync('minHtmlFil.html').toString();
    let contentUpperCase = uc.upperCase(content);


    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(contentUpperCase);
}).listen(3002);
