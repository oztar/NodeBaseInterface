'use strict'
const services = './base';

const app           = require(services).eapp;
const BrowserWindow = require(services).BW;
const window        = require(services).window;

const conf = require('./package.json');

window.setVar('env',process.argv[2]);
window.startExpress();

require('./src');


const createWindow = ()=>{
	if( window.environment == 'dev'){
	    window.mostrarDatos();
	    window.win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: window.ico,
	    });
	    window.win.webContents.openDevTools();
	
	}else{
	    window.win = new BrowserWindow({
		"fullscreen": false,
		icon: window.ico,
	    });
	    window.win.webContents.openDevTools();
	}
	
	window.win.setMenu(null);
	window.win.loadURL(window.uri);
	window.win.on('close', window.onClose);
    }

app.on('ready', createWindow);





