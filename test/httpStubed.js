var fs = require('fs');

var debug=require('debug')('jppnew:httpStubed:test');

var xml = fs.readFileSync(__dirname + '/infobae.xml', 'utf8');
var events = require('events');
var resStubed = new events.EventEmitter();

function HttpStubed(){};

HttpStubed.prototype.get = function(url, cb){
	debug('Using Stubed http.');
	cb(resStubed);
	resStubed.emit('data', xml);
	resStubed.emit('end');
	return resStubed;
};

resStubed.setMaxListeners(99);

module.exports = new HttpStubed();