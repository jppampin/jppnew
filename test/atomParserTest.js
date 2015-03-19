var should = require('should');
var parser = require('../models/atomParser');

describe('AtomParser', function suite(){
	it('Load Should not accept null url', function(){
		parser.parse(null,function(){});
	})

	it('Load Should not accept null callback', function(){
		parser.parse(null);
	})
})