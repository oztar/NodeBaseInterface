'use strict'
const services = './';


class window{

    constructor(){
	this.environment = 'dev';
	this.uri = 'http://localhost:9034';
	this.ico = __dirname + '/icon.ico';

	if( this.environment == 'dev'){
	    this.mostrarDatos();
	}
    }
    env(environment){
	this.environment = environment;
    }
    port( newPort,uri){
	this.uri = uri+':'+newPort ||'http://localhost:'+newPort;
    }

    mostrarDatos(){
	console.log('ico: ',this.ico);
	console.log('uri: ',this.uri);
	
    }
   


    onClose(){
    }
}

module.exports = window;
