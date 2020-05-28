const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const refresh = require('gulp-refresh');
const livereload = require('gulp-livereload');
const browserSync = require('browser-sync').create();
//const del = require('del');

gulp.task('styles', () => {
    return gulp.src('resources/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/'));
});

//concat and minify javascript files
gulp.task("compile-js", () => {
    return gulp.src("resources/js/*js")
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("public"))
})

//concat and compile style files
gulp.task("compile-style", () => {
    return gulp.src("resources/scss/main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("public"))
})

//livereload
gulp.task("livereload", () => {
    livereload()
})

//livereload
gulp.task("browserSyncdo", () => {
    browserSync.reload();
})

gulp.task('default', gulp.parallel("compile-style", "compile-js"));


gulp.task("watch", () => {
    browserSync.init({
            proxy: "localhost:8080",  // local node app address
            port: 5000,  // use *different* port than above
    })
    gulp.watch("resources/js/*js", ["compile-js", "browserSyncdo"]);
    gulp.watch("resources/scss/*scss", ["compile-style", "browserSyncdo"]);
    gulp.watch(["views/**/*hbs", "views/*hbs"], () => {
        browserSync.reload();
        
    })
});
