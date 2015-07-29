var models = require('../models')
var newsReader = models.newsReader;
var matchController = require('./match')(models.Match);
var debug = require('debug')('jppnew:controllers:init');

debug(matchController);

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
