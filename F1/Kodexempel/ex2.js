'use strict';
const fs = require('fs');


let filnamn = 'test.txt';

fs.stat(filnamn, function(err, stats) {
    if(err) {
        return console.error('filen finns inte: ' + filnamn);
    }
    else {
        fs.watch(filnamn, function() {
            console.log('Filen har ändrats!');
            let filtext = fs.readFileSync(filnamn).toString();
            console.log('Nytt innehåll: ' + filtext);
        });
    }
});

console.log('duh');