"use strict";

const gulp = require('gulp');
const jade = require('gulp-jade');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');

const multipage = false;

const paths = {
    root: '',
    sass: 'dev/sass',
    jade: 'dev/jade',
    css: 'css',
    js: 'js'
};

function printError(error) {

    // If you want details of the error in the console
    console.log(error.toString());

    this.emit('end')
}

gulp.task('browser-sync', ['sass', 'jade'], function () {
    browserSync({
        server: true,
        notify: true,
        browser: false
    });
});

gulp.task('jade', function () {
    var glob = (multipage) ? '/*.jade' : '/index.jade';

    return gulp.src(paths.jade + glob)
        .pipe(jade({
            pretty: true
        }))
        .on('error', printError)
        .pipe(gulp.dest(paths.root));
});

gulp.task('sass', function () {
    return gulp.src(paths.sass + '/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [paths.sass],
            outputStyle: 'nested'
        }))
        .on('error', printError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('jade-rebuild', ['jade'], function () {
    browserSync.reload();
});

gulp.task('browser-reload', function () {
    browserSync.reload();
});

gulp.task('watch', function () {
    gulp.watch(paths.sass + '/*.sass', ['sass']);
    gulp.watch(paths.jade + '/*.jade', ['jade-rebuild']);
    gulp.watch(paths.js + '/*.js', ['browser-reload']);
});

gulp.task('default', ['browser-sync', 'watch']);