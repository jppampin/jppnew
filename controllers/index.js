
var newsReader = require('../models/newsReader');
var matchController = require('./match');

function checkAuthentication(req, res, next){
	if (!req.isAuthenticated(	) ) {
		res.send(401);
	} else {
		next();
	}
}

function newsController(req, res){
	newsReader.lookup(function processed(err, feeds){
		if(err){ throw err; };
		res.json(feeds);
	});
}

module.exports = {
	newsController: newsController,
	checkAuthentication : checkAuthentication,
	matchController: matchController
}
