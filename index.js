var express = require('express');
var app = express();
var passport = require('passport');
var mongoose =require('mongoose');
var database = require('./config/database');

mongoose.connect(database.connectionString);

require('./config/passport')(passport);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
require('./routes')(app, passport);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
