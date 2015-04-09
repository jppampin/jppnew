var express = require('express');
var path = require('path');
var controllers = require('../controllers');

module.exports = function(app, passport){
	var bowerPath = path.join(__dirname , '../bower_components');
	app.use('/bower_components', express.static(bowerPath));
	app.get('/news', controllers.newsController);
	
	// locally --------------------------------
		// LOGIN ===============================
		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/', // redirect back to the signup page if there is an error
			failureFlash : false // allow flash messages
		}));

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/', // redirect back to the signup page if there is an error
			failureFlash : false // allow flash messages
		}));
};