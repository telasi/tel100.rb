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

// gulp.task('all', gulp.parallel('i18n.js', 'helpers.js', 'tel100.js', 'index.html'));
// gulp.task('default', gulp.parallel('i18n.js', 'helpers.js', 'tel100.js', 'index.html'));

/**
 * 
 */

gulp.task('tel100.js', function(cb) {
  gulp.src('./tel100/app/**/*.js')
    .pipe(removeRequireDirectives())
    .pipe(concat('tel100.js'))
    .pipe(gulpif(options.production, uglify()))
    .pipe(gulp.dest('./build'));
  cb();
});

gulp.task('i18n.js', function(cb) {
  gulp.src('./i18n/index.js')
    .pipe(browserify())
    .pipe(concat('i18n.js'))
    .pipe(gulpif(options.production, uglify()))
    .pipe(gulp.dest('./build'));
  cb();
});

gulp.task('helpers.js', function(cb) {
  gulp.src('./helpers/index.js')
    .pipe(browserify())
    .pipe(concat('helpers.js'))
    .pipe(gulpif(options.production, uglify()))
    .pipe(gulp.dest('./build'));
  cb();
});

gulp.task('index.html', function(done) {
  var indexHtml = swig.renderFile('index.swig', {
    version: new Date().getTime()
  });
  fs.writeFileSync('index.html', indexHtml);
  done();
});

function tel100(){ 
  return gulp.src('./tel100/app/**/*.js')
    .pipe(removeRequireDirectives())
    .pipe(concat('tel100.js'))
    .pipe(gulpif(options.production, uglify()))
    .pipe(gulp.dest('./build'));
};

function index(done){
  var indexHtml = swig.renderFile('index.swig', {
    version: new Date().getTime()
  });
  fs.writeFileSync('index.html', indexHtml);
  done();
}

gulp.task('default', function (cb) {
  gulp.watch('./i18n/**/*.js', gulp.series( 'i18n.js', 'index.html' ));
  gulp.watch('./helpers/**/*.js', gulp.series( 'helpers.js', 'index.html' ));
  gulp.watch('./tel100/app/**/*.js', gulp.series('tel100.js', 'index.html' ));
  cb();
});

gulp.task('all', function(done) {
  gulp.series('i18n.js', 'helpers.js', 'tel100.js', 'index.html');
  done();
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
    file.contents = buffer.Buffer.from(newLines.join('\n').trim(), 'utf-8');
    cb(null, file);
  };

  return eventStream.map(transform);
}
