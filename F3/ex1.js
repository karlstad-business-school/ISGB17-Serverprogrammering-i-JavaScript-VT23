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
    let url = req.url;
    url = url.substring(1);

    //Kontrollera om fil existerar
    fs.stat(url, function(err, stats) {
      if(err) {
        html ="<h1>Fil existerar inte</h1>";
        res.writeHead(404, {'Content-Type': 'text/html'});
      }
      else {

        //Här ändrar vi lite...

        let lastDot = url.lastIndexOf('.');
        let fileExtension = url.substring(lastDot + 1);

        console.log( url, lastDot, fileExtension );

        //Vi nöjer oss med svg och ico... (default html)

        switch(fileExtension) {

          case 'svg':
            res.writeHead(200, {'Content-Type': 'image/svg+xml'});
            break;

          case 'ico':
            res.writeHead(200, {'Content-Type': 'image/x-icon'});
            break;
            
          default: 
           res.writeHead(200, {'Content-Type': 'text/html'});
            break;

        }

        //Observera att .ico-filern inte är text!
        html = fs.readFileSync(url).toString();
       // res.writeHead(200, {'Content-Type': 'text/html'});
        
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

