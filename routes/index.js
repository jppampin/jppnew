var express = require('express');
var path = require('path');
var controllers = require('../controllers');
var sendgrid = require('sendgrid')('jppampin', 'e8J3EkQ87og7');

module.exports = function(app, passport){
	var bowerPath = path.join(__dirname , '../bower_components');
	app.use('/bower_components', express.static(bowerPath));
	app.get('/news', controllers.checkAuthentication, controllers.newsController);
	
	// locally --------------------------------
	// LOGIN ===============================
	// process the login forpn

	app.post('/api/login', passport.authenticate('local-login'), function (req, res) {
	// body...
		res.send(req.user);
	});

	// process the signup form
	app.post('/api/signup', passport.authenticate('local-signup'), function (req, res) {
		// body...
		res.end();
	});
	
	app.post('/api/logout', function(req, res){
		req.logout();
		res.send(200);
	});

	app.get('/api/match', controllers.matchController.getAll);

	app.get('/api/forgotPassword', function(req, res, next){ 
		var forgorPasswordMessage = {
		  to      : 'jppampin@gmail.com',
		  from    : 'lacanchadetuhermana@gmail.com',
		  subject : 'Te olvidaste el password?',
		  text    : 'Reset here: link...'
		};
		sendgrid.send(forgorPasswordMessage, function(err, json){
			if(err){ console.log(err)};
			console.log(json);
			res.end();
		})
	})

	app.post('/api/match/:matchId/addPlayer', controllers.matchController.addPlayer);
}

