'use strict';

// Kodexempel 2 - 50%

function JaEllerNej() {
    return new Promise( function(resolve, reject) {
        let tal = Math.round(Math.random() * 1); // 0 or 1 (=true or false)

        if(tal) {
            resolve('Ja!');
        }
        else {
            reject('Näää...');
        }

        //(Eller tal ? resolve('Ja!') : reject('Näää...');)
    });
}

/* DEL 1
async function msg() {
    try {
        const msg = await JaEllerNej();
        console.log(msg);
    } catch (err) {
        console.log(err);
    }
}
*/

/* DEL 2 */
/*
async function msg() {
    const msg = await JaEllerNej();
    console.log(msg);
}

msg().catch(x => console.log(x));
*/

/* DEL 3 */
async function msg() {
    const msg = await JaEllerNej();
    return msg;
}

msg().then(function (x) { console.log(x) }).catch(function (err) { console.log(err) });



