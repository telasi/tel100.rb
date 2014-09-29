var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('newuser', function() {
  return browserify().require('./apps/newuser.js', { expose: 'newuser' }).bundle()
    .pipe(source('./newuser.js'))
    .pipe(gulp.dest('../public/js'));
});
