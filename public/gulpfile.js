var fs = require('fs')
  , gulp = require('gulp')
  , swig  = require('swig')
  , gulpif = require('gulp-if')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , buffer = require('buffer')
  , minimist = require('minimist')
  , browserify = require('gulp-browserify')
  , eventStream = require('event-stream');

var knownOptions = {
  boolean: 'production',
  default: { 'production': false }
};

var options = minimist(process.argv.slice(2), knownOptions);

/**
 * Task for building all targets.
 */

gulp.task('all', ['i18n.js', 'helpers.js', 'tel100.js', 'index.html']);

/**
 * 
 */

gulp.task('default', function () {
  gulp.watch('./i18n/**/*.js', [ 'i18n.js', 'index.html' ]);
  gulp.watch('./helpers/**/*.js', [ 'helpers.js', 'index.html' ]);
  gulp.watch('./tel100/app/**/*.js', [ 'tel100.js', 'index.html' ]);
});

gulp.task('tel100.js', function() {
  gulp.src('./tel100/app/**/*.js')
    .pipe(removeRequireDirectives())
    .pipe(concat('tel100.js'))
    .pipe(gulpif(options.production, uglify()))
    .pipe(gulp.dest('./build'));
});

gulp.task('i18n.js', function() {
  gulp.src('./i18n/index.js')
    .pipe(browserify())
    .pipe(concat('i18n.js'))
    .pipe(gulpif(options.production, uglify()))
    .pipe(gulp.dest('./build'));
});

gulp.task('helpers.js', function() {
  gulp.src('./helpers/index.js')
    .pipe(browserify())
    .pipe(concat('helpers.js'))
    .pipe(gulpif(options.production, uglify()))
    .pipe(gulp.dest('./build'));
});

gulp.task('index.html', function() {
  var indexHtml = swig.renderFile('index.swig', {
    version: new Date().getTime()
  });
  fs.writeFileSync('index.html', indexHtml);
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
}
