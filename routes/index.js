var express = require('express');
var path = require('path');

module.exports = function(app){
	var bowerPath = path.join(__dirname , '../bower_components');
	app.use('/bower_components', express.static(bowerPath));
}	