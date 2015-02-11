var express = require('express');
var path = require('path');
var controllers = require('../controllers');

module.exports = function(app){
	var bowerPath = path.join(__dirname , '../bower_components');
	app.use('/bower_components', express.static(bowerPath));
	app.get('/news', controllers.newsController);
}	