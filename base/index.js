'use strict'

/* --------------  eventemitter -------------*/
/*
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
*/


module.exports.eapp = require('electron').app;
module.exports.BW   = require('electron').BrowserWindow;
const base = require('./base');
let window = new base();
module.exports.window = window;

/*
    url     : require('url'),
    path    : require('path'),
    express : require('./web').express,   
    router  : require('./web').router,
    render  : require('./ejs_render'),
    db      : require('./database'),

    io      : require('./io').io,
    server  : require('./io').server,
    app     : require('./io').app,
    fs      : require('fs'),    
    crypto  : require('crypto'),
}

require('./class_engine');
require('./class_item');
*/
