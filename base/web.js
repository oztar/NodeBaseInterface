'use strict'
let express = require('express');
let app     = express();
let router  = express.Router();

let ejs = {
    delimite : '?'
}
app.set('view engine', 'ejs');


module.exports.express = express;
module.exports.app     = app;
module.exports.router  = router;
