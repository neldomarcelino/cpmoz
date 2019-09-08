var express = require('express');
var router = express.Router();

module.exports = function(app){
	var user = app.controllers.user;
	
	app.get('/login', user.login);
	app.post('/travel', user.travel);
	app.get('/logout', user.logout);
};
