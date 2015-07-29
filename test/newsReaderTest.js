var should = require('should');
var proxyquire = require('proxyquire');
var debug = require('debug')('jppnew:test:xmlReader');
var Q = require('q');

var httpStubed = require('./httpStubed');
var result, error;

var xmlReaderStubed = proxyquire('../models/xmlReader', { http: httpStubed });
var newsReader = proxyquire('../models/newsReader', { xmlReader: xmlReaderStubed });

xdescribe('newsReadr', function sute(){
	before(function(done){
		newsReader.lookup(function(err, res){
			result = res;
			error = err;
			done();
		});
	});

	it('Should retrieve a result', function(){
		result.should.not.be.null;
	});

});