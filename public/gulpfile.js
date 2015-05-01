var gulp = require('gulp')
  , shell = require('gulp-shell')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , buffer = require('buffer')
  , browserify = require('gulp-browserify')
  , eventStream = require('event-stream');

gulp.task('all', ['i18n.js', 'helpers.js', 'tel100.js']);

gulp.task('default', function () {
  gulp.watch('./i18n/**/*.js', [ 'i18n.js' ]);
  gulp.watch('./helpers/**/*.js', [ 'helpers.js' ]);
  gulp.watch('./tel100/app/**/*.js', [ 'tel100.js' ]);
});

gulp.task('tel100.js', function() {
  gulp.src('./tel100/app/**/*.js')
    .pipe(removeRequireDirectives())
    .pipe(concat('tel100.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('i18n.js', function() {
  gulp.src('./i18n/index.js')
    .pipe(browserify())
    .pipe(concat('i18n.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('helpers.js', function() {
  gulp.src('./helpers/index.js')
    .pipe(browserify())
    .pipe(concat('helpers.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

/**
 * This function removes ExtJS `requires` directives
 * from source files.
 */

function removeRequireDirectives() {
  function transform(file, cb) {
    var text = file.contents.toString();
    var lines = text.split('\n');
    var newLines = [];
    var requireBlock = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.indexOf('requires:') !== -1) { requireBlock = true; }
      if (!requireBlock) { newLines.push(line); }
      if (line.indexOf('],') !== -1) { requireBlock = false; }
    }
    file.contents = new buffer.Buffer(newLines.join('\n').trim(), 'utf-8');
    cb(null, file);
  };

  return eventStream.map(transform);
};
