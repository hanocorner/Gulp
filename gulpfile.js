'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

gulp.paths = {
  dist: 'dist',
  vendors: 'dist/vendors'
};

var paths = gulp.paths;

// Start browserSync server
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  })
});

// Gulp Sass
gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});


// Watchers
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
});

// Gulp Default Task
gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});
