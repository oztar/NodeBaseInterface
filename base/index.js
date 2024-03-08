'use strict'

/* --------------  eventemitter -------------*/
/*
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
*/

module.exports.eapp    = require('electron').app;
module.exports.BW      = require('electron').BrowserWindow;
module.exports.io      = require('socket.io');
module.exports.http    = require('http');
//module.exports.ee      = myEmitter;
module.exports.express = require('./web').express;
module.exports.app     = require('./web').app;
module.exports.router  = require('./web').router;
module.exports.render  = require('./ejs');

const base = require('./base');
let window = new base();

module.exports.window = window;


