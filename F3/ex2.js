'use strict';

//Skapa projekt: npm init

//nodemon finns sedan tidigare installerat globalt (npm install -g nodemon)

//installera express: npm install express

//1. Starta upp en express-server som lyssnar på port 81.

//2. Lägg till get end-point "/" och skicka static/html/index.html och använd asynk-funktion.

//3. Lägg till get end-point "/favicon.ico" och skicka static/ico/favicon.ico och använd asynk.

//4. Lägg till middleware för /static och urlencoded för formulär.

//5. Lägg till post end-point för "/" och kontrollera indata samt skicka static/html/index.html och använd asynk-funktion. Använda Postman för att testa!

//6. Lägg till put och delete end-points för "/" samt skicka static/html/index.html och använd asynk-funktion. Använda Postman för att testa!
    
const express = require('express');

let app = express();

//Middleware
app.use('/static', express.static(__dirname + '/static'));


app.listen(81, function() {
    console.log( 'Japp servern är uppe!');
});

app.get('/', function(request, response) {

    response.sendFile( __dirname + '/static/html/index.html', function( err ) {
        //skicka meddelande till användaren att ngt gått fel
    });

});

