'use strict';

/*
    npm init
    npm install express
    npm install jsdom
*/

//Starta express
const express = require('express');
const jsDOM = require('jsdom');
const fs = require('fs');

const app = express();

app.listen(81, function() {
    console.log('Min Express-server är uppe och svarar på port 81');
});

//nodemon app.js

// Inställningar för Middleware
app.use('/public', express.static(__dirname + '/static'));
app.use(express.urlencoded( { extended : true} ));

//end-point GET '/' --> localhost:81
app.get('/', function(request, response) {

    response.sendFile(__dirname + '/static/html/form.html', function(err) {

        if( err ) {
            console.log( err );
            response.send( err.message );
        } else {
            console.log(request.url, request.method);
        }

    });

});

//end-point POST '/' --> localhost:81
app.post('/', function(request, response) {

    console.log( request.body );
    //response.send(request.body.Peter);

    let red = request.body.red;
    let green = request.body.green;
    let blue = request.body.blue;

    //console.log( red );

    try {

        if( red === undefined || blue === undefined || green === undefined) {
            throw 'Färg saknas';
        }

        red = red.trim();
        green = green.trim();
        blue = blue.trim();

        if(red.length === 0 || green.length === 0 || blue.length === 0 ) {
            throw 'Färg får inte vara tomt!';
        }

        if( isNaN(red) || isNaN(green) || isNaN(blue)) {
            throw 'Färg skall bestå av heltal!';
        }

        red = parseInt(red);
        green = parseInt(green);
        blue = parseInt(blue);

        if( ( red < 0 || red > 255) || 
        (green < 0 || green > 255) ||
        (blue < 0 || blue > 255) ){
            throw 'Färg skall bestå av tal mellan 0 och 255!';
        }

        if( ( red === 0 && green === 0 && blue === 0) ||
        (red === 255 && green === 255 && blue === 255)) {
            throw 'Felaktig färg!';
        }

        //Allt OK!

        fs.readFile(__dirname + '/static/html/index.html', function( err, data ) {

            if( err ) {
                console.log( err );
                response.send( err.message );
            } else {

                let serverDOM = new jsDOM.JSDOM( data );

                serverDOM.window.document.querySelector('#status').style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
                data = serverDOM.serialize();

                response.send( data );
            }

        });


    } catch(errMsg) {

        console.log( errMsg );
        response.sendFile(__dirname + '/static/html/form.html', function(err) {

            if( err ) {
                console.log( err );
                response.send( err.message );
            } else {
                console.log(request.url, request.method);
            }
    
        });
    }

});
