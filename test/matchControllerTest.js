require('mongoose').connect('mongodb://localhost/test');
var should = require('should');
var proxyquire = require('proxyquire');
var debug = require('debug')('jppnew:test:match');
var instance = require('../controllers').matchController;
var info =require('debug')('jppnew:matchController:test');
var player = { _id: '55b7cba3b8a5809c1866517d',
  user:
   { _id: '55b6731f064ace1c149b7f1f',
     local:
      { password: '$2a$08$y4owdhCrHEvfejIN.G71yeAbz1sSAWsT8tanP9DMcrZMTNqEUuGEa',
        email: 'jppampin@gmail.com',
        name: 'Juan Pablo Pampin Picasso' } },
  confirmed: true,
  numOfMatches: 0 };

var req = {
	params : {
		matchId : '55b7ba2503499f341dd5b647'
	},
	body : player
};

var res = {
	send : function  () {
	},
	json : function  () {
	}
};


describe('matchController', function suite(){
   it('Should have getAll addPlayer and confirmPlayer', function(){
       instance.getAll.should.be.a.Function;
       instance.addPlayer.should.be.a.Function
       instance.confirmPlayer.should.be.a.Function;
   });

   it('Should retrieve a list of matches', function(done){
       instance.getAll(req, res).then(function(matches) {
       		info('Getting matches.' + JSON.stringify(matches));
       		matches.should.have.lengthOf(1);
       		done();
       });

   });

   it('Should confirm a player', function(done){
       instance.confirmPlayer(req, res).then(function() {
       		info('Confirming match' );
       		done();
       });

   });

});

