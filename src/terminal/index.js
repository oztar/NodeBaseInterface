let servicesBase = '../../base';
let window = require(servicesBase).window;

const libwt = require('web-terminaljs');

const options = {
    enable: true,
    publicip : window.publicIP,
    port : window.port,
    modules : {
	"wtm_default" : true,
	"wtm_loginBasic" : false,
	"wtm_loginCrypto" : true
    },
    url: '/terminal',
    login : false,
    express: window.express,
    app: window.app,
    io: window.io
};
const wt = new libwt(options);
