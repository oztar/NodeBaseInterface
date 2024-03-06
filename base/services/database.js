'use strict'
const sqlite3 = require('sqlite3').verbose();
const c       = require('./config');

let db = new sqlite3.Database(c.config.db, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to database. ',c.config.db);
    }
});

module.exports = db;
