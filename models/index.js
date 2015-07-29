var User = require('./user');
var Player = require('./player');
var Match = require('./match')(Player);
var rssParser = require('./rssParser');;
var xmlReader = require('./xmlReader');;

var models = {
	Match : Match,
	Player : Player,
	User : User,
	rssParser : rssParser,
	xmlReader : xmlReader
};


module.exports = models;

