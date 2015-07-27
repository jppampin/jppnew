var should = require('should');
var proxyquire = require('proxyquire');
var debug = require('debug')('jppnew:test:player');
var Player = require('../models/player');
var instance = new Player();


describe('player', function suite(){
   it('Should have User and number of matches propertied', function(){
       instance.should.have.property('numOfMatches');
       instance.should.have.property('user');
   });

   it('Should hava a method save', function  () {
   		instance.save.should.be.a.Function;
   }) 
    
});
