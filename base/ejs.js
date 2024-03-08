'use strict'

const ejs = require('ejs');
const fs  = require('fs');

module.exports = (theme,template,json)=>{    
    return ejs.renderFile( __dirname +'\\..\\src\\www\\'+theme+'\\views\\' + template+'.ejs', json);
};
