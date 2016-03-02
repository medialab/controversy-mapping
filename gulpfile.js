var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require( 'gulp-util' );
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('less', function() {
    return gulp.src('./assets/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/lodash/lodash.js',
      './bower_components/handlebars/handlebars.min.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components/tabletop/src/tabletop.js',
      './bower_components/jquery-highlight/jquery.highlight.js',
      './bower_components/letteringjs/jquery.lettering.js'
      ],
      {base: 'bower_components/'}
    )
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('serve', function() {
    browserSync.init({ server: "./" });

    gulp.watch('./assets/less/*.less', ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('build',['less', 'js']);
gulp.task('default', ['build', 'serve']);
