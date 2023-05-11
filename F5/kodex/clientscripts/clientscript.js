'use strict';
const socket = io();

window.addEventListener('load', ()=> {
    document.querySelector('.btn').addEventListener('click', buttonClick);
});


function buttonClick(evt) {
    socket.emit('finafisken','en massa data...');
}

socket.on('newcolor', (data)=> {
    let body = document.querySelector('body');
    body.setAttribute('style','background-color: rgb(' + data.red + ',' + data.green + ',' + data.blue + ')');
     

});