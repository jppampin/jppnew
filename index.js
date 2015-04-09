var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var passport = require('passport');
var mongoose =require('mongoose');
var database = require('./config/database');
var session = require("express-session");

mongoose.connect(database.connectionString);

require('./config/passport')(passport);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./routes')(app, passport);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
