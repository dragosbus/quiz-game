'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');


gulp.task('serve', ['style'], () => {
  gulp.watch('scss/**/*.scss', ['style']);
  gulp.watch('*.html').on('change', browserSync.reload);

  browserSync.init({
    server: './'
  });
});

gulp.task('scripts', () => {
  gulp.src('js/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('style', () => {
  gulp.src('scss/**/*.scss')
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(autoPrefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});