'use strict'
const services = './';
const router  = require(services).router;
const app     = require(services).app;
const express = require(services).express;
const _render = require(services).render;


class base{

    constructor(){
	this.router = router;
	this.name = 'NodeBaseInterface';
	this.version = 'v2_base_express';
	this.environment = 'dev';
	this.port = Math.floor(Math.random() * (2000 - 1000) + 1000)
	this.uri = 'http://localhost:'+this.port;
	this.ico = __dirname + '/icon.ico';
	this.webTheme = 'spartan';
	
	if( this.environment == 'dev'){
	    this.mostrarDatos();
	}
    }
    setVar(nameVar, value){
	this[nameVar] = value;
    }
    setPort( newPort,uri){
	this.port = newPort;
	this.uri = uri+':'+newPort ||'http://localhost:'+newPort;
    }

    mostrarDatos(){
	console.log('ico: ',this.ico);
	console.log('uri: ',this.uri);
	
    }
    render(theme,file,json){
	return _render(theme,file,json);
    }
    startExpress(){
	this.router.get('/', (req,res)=>{	
	    this.render(this.webTheme,'index', {
		version: this.version,
		title:   this.name,
	    }).then( (html)=>{
		res.send( html );
	    });
	});
	
	app.use(this.router);
	
	app.use(express.static(__dirname+'/../src/www/'+this.webTheme+'/public'));	
	
	app.listen(this.port, ()=>{
	    if( this.environment == 'dev'){
		console.log(' listen ', this.port);
	    }
	});
    }
    

    onClose(){
    }
}

module.exports = base;
