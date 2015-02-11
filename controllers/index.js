var newsReader = require('../models/newsReader');

function newsController(req, res){
	newsReader.lookup(function processed(err, feeds){
		if(err){ throw err; };
		res.json(feeds);
	});
}

module.exports = {
	newsController: newsController
}