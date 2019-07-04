const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync").create();

function style() {
    return gulp
        .src(['./src/sass/fonts.sass', './src/sass/styles.sass', './src/sass/media.sass'])
        .pipe(plumber())
        .pipe(sass()).on("error", sass.logError)
        .pipe(concat('all.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest("./src/css/"))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./src/css/"))
        .pipe(browserSync.stream());
}

function reload() {
    browserSync.reload();
}
 
function watch() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("src/sass/*.sass", style).on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}

exports.style = style;
exports.reload = reload;
exports.watch = watch;