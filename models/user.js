// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    numOfMatches : Number,
    isAdmin : Boolean,
    local            : {
        name         : String,
        email        : String,
        password     : String,
        salt         : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password, salt) {
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.generateSalt = function() {
    return bcrypt.genSaltSync();
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return this.local.password === bcrypt.hashSync(password, this.local.salt);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);