'use strict';

/*
    npm init
    npm install express
    npm install jsdom

    Tillägg (1) 20230504: npm install cookie-parser
*/

//Starta express
const express = require('express');
const jsDOM = require('jsdom');
const fs = require('fs');

//Tillägg (2) 20230504
//Gör cookie-parser tillgänglig för er app
const cookieParser = require('cookie-parser');

const app = express();

app.listen(81, function() {
    console.log('Min Express-server är uppe och svarar på port 81');
});

//nodemon app.js

// Inställningar för Middleware
app.use('/public', express.static(__dirname + '/static'));
app.use(express.urlencoded( { extended : true} ));

//Tillägg (3) 20230504
//Lägg till ett middleware för cookie-parser för signed!
app.use(cookieParser('secret'));


//Tillägg (5) 20230504
//end-pont GET '/start'
//Om kakorna finns läs upp index.html.
//Ändra backgrundsfärgen till kakornas innehåll för elementet med #status.
//Finns inte kakorn gör redirect till '/'
app.get('/start', function(request, response) {

   // console.log( request.signedCookies );
    let red = request.signedCookies.red;
    let green = request.signedCookies.green;
    let blue = request.signedCookies.blue;

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


    //response.redirect('/');

});



//Tillägg (6) 20230504
//end-point GET '/reset'
//Om kakorna finns delete och oavsett redirect till '/'

//end-point GET '/' --> localhost:81
app.get('/', function(request, response) {

    response.sendFile(__dirname + '/static/html/form.html', function(err) {

        if( err ) {
            console.log( err );
            response.send( err.message );
        } else {
            console.log(Date.now(), request.url, request.method);
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

                //Tillägg (4) 20230504
                //Skapa en kaka för varje färg.
                //Använd namn, värde, maxAge, httpOnly & signed
                response.cookie('red', red, {maxAge : 60*60*1000, httpOnly : true, signed : true});
                response.cookie('green', green, {maxAge : 60*60*1000, httpOnly : true, signed : true});
                response.cookie('blue', blue, {maxAge : 60*60*1000, httpOnly : true, signed : true});

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
