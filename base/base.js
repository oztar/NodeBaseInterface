'use strict'
const services = './';
const router  = require(services).router;
const app     = require(services).app;
const express = require(services).express;
const _render = require(services).render;
const io      = require(services).io;
const http    = require(services).http;


class base{

    constructor(){
	this.express = express,
	this.app = app,
	this.router = router;
	this.name = 'NodeBaseInterface';
	this.version = 'v2_base_express';
	this.environment = 'dev';
	this.publicIP = 'localhost';
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
	if(nameVar == 'port' || nameVar == 'publicIP'){
	    this.newUri();
	}
    }
    newUri(){
	this.uri = 'http://'+this.publicIP+':'+this.port;
    }

    setPort( newPort,uri){
	this.port = newPort;
	this.newUri();
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
		portio: this.port
	    }).then( (html)=>{
		res.send( html );
	    });
	});
	
	this.app.use(this.router);
	
	this.app.use(express.static(__dirname+'/../src/www/'+this.webTheme+'/public'));	

	this.server = http.createServer(app);
	this.io = io(this.server);

	this.server.listen(this.port, this.publicIP, ()=>{
	    if( this.environment == 'dev'){
		console.log(' listen ', this.port);
	    }
	});
    }
    

    onClose(){
    }
}

module.exports = base;
