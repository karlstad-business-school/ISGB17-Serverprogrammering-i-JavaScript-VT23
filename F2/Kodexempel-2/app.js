'use strict';
const fs = require('fs');
//const http = require('http');


//"Main"
replace().then((returvarde)=> {
	//Ta hand om eventuella returvärden från async-function
	console.log(returvarde);
});
console.log('Programkörning fortsätter');




async function replace() {
	
	//Öppna Stoooooor filen
	console.log('startar fil-läsning...');
	let megaFil = await fs.readFileSync('stor-fil.txt').toString();
	console.log('fil-läsning klar!');
	console.log('startar beräkningar');
	for(let i=0; i<1000; i++) {
		for(let j=0; j<megaFil.length; j++) {			
			if(megaFil[j]==='a') {
				//Gör något
			}				
		}
	} 	
	console.log('beräkningar färdiga!');	
	return Promise.resolve('tjo!');	
}