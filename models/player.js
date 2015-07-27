var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var playerSchema = mongoose.Schema({
    numOfMatches : Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Player', playerSchema );