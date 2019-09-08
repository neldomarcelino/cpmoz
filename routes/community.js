var express = require('express');
var router = express.Router();

module.exports = function(app) {

	var autentice = require('./../middleware/autentice');
	var community = app.controllers.community;

	app.get('/community', community.index);
	app.get('/community/:id',autentice, community.show);
	app.post('/community',autentice, community.create);
	app.get('/community/:id',autentice, community.edit);
	app.del('/community',autentice, community.destroy);
	
};
