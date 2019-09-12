var express = require('express');
var router = express.Router();

module.exports = function(app){
	var user = app.controllers.user;
	
	app.get('/login', user.login);
	app.post('/autentice', user.autentice);
	app.post('/registry', user.registry);
	app.get('/registry', user.getRegistry);
	app.get('/logout', user.logout);
};
