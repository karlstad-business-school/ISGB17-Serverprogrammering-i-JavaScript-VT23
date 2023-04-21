'use strict';
//Kodex_1, egna moduler
const http = require('http');
const fs = require('fs');

//Steg 1
/************************************************************* */
/*
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.end();
}).listen(3001);
*/
/************************************************************* */

//Steg 2
/************************************************************* */
/*
http.createServer(function (req, res) {
  
  let filnamn;
  //Kontrollera om tomt
  if(req.url === '/') {
    //Visa standardsida, index.html
    filnamn = "index.html";
    console.log('Yo');
  }
  else {
    //Hämta fil ifrån url
    filnamn = req.url;
    //Ta bort inledande '/'
    filnamn = filnamn.substr(1);
    console.log(filnamn);
  }

  //Kontrollera om fil finns
  fs.stat(filnamn, function (err, stats) {
    if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }
    else {
      //Läs in fil
      res.writeHead(200, { 'Content-Type': 'text/html' });
      let content = fs.readFileSync(filnamn).toString();
      res.write(content);
      res.end();
    }
  });

}).listen(3001);
*/
/************************************************************* */

//Steg 3
/************************************************************* */
/*
exports.mySimpleServerStart = function () {
  http.createServer(function (req, res) {

    let filnamn;
    //Kontrollera om tomt
    if(req.url === '/') {
      //Visa standardsida, index.html
      filnamn = "index.html";
      console.log('Yo');
    }
    else {
      //Hämta fil ifrån url
      filnamn = req.url;
      //Ta bort inledande '/'
      filnamn = filnamn.substr(1);
      console.log(filnamn);
    }

    //Kontrollera om fil finns
    fs.stat(filnamn, function (err, stats) {
      if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end();
      }
      else {
        //Läs in fil
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let content = fs.readFileSync(filnamn).toString();
        res.write(content);
        res.end();
      }
    });

  }).listen(3001);
}
*/
/************************************************************* */













/*
Since we program a single-threaded VM, 
it is essential that we do not block execution by waiting for I/O, 
but handle operations concurrently



// Normal Function
function add(a,b){
  return a + b;
}
// Async Function
async function add(a,b){
  return a + b;
}




Copyright (c) 2020 Alligator.io





//We then declare an async function and await for the promise to resolve before logging 
//the message to the console:


function scaryClown() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡');
    }, 2000);
  });
}

async function msg() {
  const msg = await scaryClown();
  console.log('Message:', msg);
}

msg(); // Message: 🤡 <-- after 2 seconds

//await is a new operator used to wait for a promise to resolve or reject. 
//It can only be used inside an async function.

*/
