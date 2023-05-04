'use strict';

//nodeClientDemo.js

/*
    På egen hand kan ni lägga till en timer som exekerar t ex 10 gånger och det med 5 sekunders mellanrum.
    I varje timer-händelser gör ni en request mot er server från W1.

    Tips!
    Skapa ett global objekt med timerid, nbrOfTimerEvents och httpRequest.
    Använd setInterval() och clearInterval()!
*/

//Nedan följer koden för vår klient som gör ETT anrop till vår server.

const http = require('http');

const options = {
    hostname : 'localhost',
    port : 81,
    path : '/',
    method : 'GET'
};

let httpRequest = http.request(options, function( response ) {

    response.on('data', function( data ) {
        console.log( data.toString() );
    });

});

httpRequest.on('error', function( error) {
    console.log( error );
});

httpRequest.end();