/* your code here */
let servicesBase = '../base';
let window = require(servicesBase).window;

window.io.on('connection', ()=>{
    console.log('io on conection');
});
