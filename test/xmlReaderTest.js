var should = require('should');
var proxyquire = require('proxyquire');
var debug = require('debug')('jppnew:test:xmlReader');
var Q = require('q');

var httpStubed = require('./httpStubed');
var result, error;

var xmlReader = proxyquire('../models/xmlReader', { http: httpStubed });
var xmlReader_load = Q.denodeify(xmlReader.load);

debug('Stubed:' + httpStubed);
xdescribe('xmlReader', function suite(){
	before( function(done){
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

	it('Should have properties url and doc', function(){
		result.should.have.property('url');
		result.should.have.property('doc');
	});
});	