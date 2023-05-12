'use strict';
let socket = io();

window.addEventListener('load',()=>{
    let buttons = document.querySelectorAll('.birdbutton');

    buttons.forEach((button)=> {
        button.addEventListener('click', sendbgk);
    });
});

function sendbgk(evt) {
    evt.preventDefault();

    let bildnr = evt.target.getAttribute('data-birdid');

    socket.emit('bytbild', bildnr);


}

socket.on('nybakgrund', function(data){
    console.log('Byt bakfgrundsbild till: ' + data.bildid);
    let body = document.querySelector('body');
    body.setAttribute('style','background-image: url("public/images/' + data.bildid + '.jpg");');
});