'use strict';
//Kodex_1, egna moduler
const http = require('http');
const fs = require('fs');

//Steg 1
/************************************************************* */
exports.mySimpleServerStart = function() {
http.createServer(function (req, res) {

  let html;

  if(req.url==='/') {
     html = fs.readFileSync('index.html').toString();
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(html);
     res.end();
  }
  else {
    let filnamn = req.url;
    filnamn = filnamn.substring(1);

    //Kontrollera om fil existerar
    fs.stat(filnamn, function(err, stats) {
      if(err) {
        html ="<h1>Fil existerar inte</h1>";
        res.writeHead(404, {'Content-Type': 'text/html'});
      }
      else {
        html = fs.readFileSync(filnamn).toString();
        res.writeHead(200, {'Content-Type': 'text/html'});
        
      }
      res.write(html);
      res.end();

    });
    
    //html="duh?";
  }


  
}).listen(3002);
}
/************************************************************* */

//Steg 2
/************************************************************* */
