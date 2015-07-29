var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require('./player');

module.exports = function init(Player){

var matchSchema = mongoose.Schema({
    title : String,
    when : Date,
    location : String,
    players : [Player.schema ]
});

return mongoose.model('Match', matchSchema);

}; 
