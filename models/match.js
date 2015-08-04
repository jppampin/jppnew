var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require('./player');

module.exports = function init(Player){

var matchSchema = mongoose.Schema({
    title : String,
    when : { type: Date, default: Date.now },
    location : String,
    players : [Player.schema ]
});

return mongoose.model('Match', matchSchema);

}; 
