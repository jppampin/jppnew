var mongoose = require("mongoose");

var matchSchema = mongoose.Schema({
    title : String,
    when : Date,
    location : String,
    players : [{ type: Schema.Types.ObjectId, ref: 'Player' }]
});


module.exports =  mongoose.model('Match', matchSchema);