var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var playerSchema = mongoose.Schema({
    numOfMatches : {type : Number, default: 0},
    confirmed : {type : Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Player', playerSchema );