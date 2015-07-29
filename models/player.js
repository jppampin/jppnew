var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
require('./user');

var playerSchema = mongoose.Schema({
    numOfMatches : Number,
    confirmed : Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Player', playerSchema );