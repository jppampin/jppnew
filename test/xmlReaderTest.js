var fs = require('fs');

var should = require('should');
var proxyquire = require('proxyquire');
var debug = require('debug')('jppnew:test:xmlReader');
var Q = require('q');

var xml = fs.readFileSync(__dirname + '/infobae.xml', 'utf8');
var events = require('events');
var resStubed = new events.EventEmitter();
var httpStubed = {
	get: function(url, cb){
		debug('Using Stubed http.');
		cb(resStubed);
		resStubed.emit('data', xml);
		resStubed.emit('end');
		return resStubed;
	}
};
var result, error;

var xmlReader = proxyquire('../models/xmlReader', { http: httpStubed });
var xmlReader_load = Q.denodeify(xmlReader.load);


describe('xmlReader', function suite(){
	before( function(done){
		// xmlReader.load('http://anyUrl', function(err, res){
		// 	result = res;
		// 	error = err;
		// 	done();
		// });
		xmlReader_load('http://anyUrl.com')
			.then(function(res){
				result = res;
				done();
			})
			.catch(function(err){
				error = err;
				done();
			});
	});

	it('Should retrieve a result', function(){
		result.should.not.be.null;
	});

	it('Should not retrieve an error', function(){
		should(error).be.undefined;
	});
});