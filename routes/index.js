var express = require('express');
var path = require('path');
var controllers = require('../controllers');

module.exports = function(app, passport){
	var bowerPath = path.join(__dirname , '../bower_components');
	app.use('/bower_components', express.static(bowerPath));
	app.get('/news', controllers.checkAuthentication, controllers.newsController);
	
	// locally --------------------------------
	// LOGIN ===============================
	// process the login forpn

	app.post('/login', passport.authenticate('local-login'), function (req, res) {
	// body...
		res.send(req.user);
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup'), function (req, res) {
		// body...
		res.end();
	});
	
	app.post('/logout', function(req, res){
		req.logout();
		res.send(200);
	});
		
}