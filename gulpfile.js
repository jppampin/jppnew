// gulpfile.js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['nodemon'], function () {
});

gulp.task('nodemon', function (cb) {
  
  var started = false;
  
  return nodemon({
    script: 'index.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true; 
    } 
  });
});