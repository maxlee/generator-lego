"use strict";

// 加载插件
var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    // minifyCSS    = require('gulp-minify-css'),
    header       = require('gulp-header'),
    // uglify       = require('gulp-uglify'),
    moment       = require('moment'),
    reload       = browserSync.reload;
    // clean        = require('gulp-clean'),
    // rename       = require("gulp-rename");


// 注释格式
// var pkg = require('./package.json');
// var banner = '/*!' + '\n * @project : ' + pkg.name + '\n * @version : ' + pkg.version + '\n * @author  : ' + pkg.author + '\n * @update  : ' + moment().format('YYYY-MM-DD h:mm:ss a') + '\n */\r';

// 启动服务
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./src/",
            directory: true
        },
        notify: false,
        port: 8080,
        open: "external",
        browser: "google chrome"
    });
});

// // 脚本压缩
// gulp.task('uglify', function() {
//     gulp.src('./src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js/'))
// });

// 样式压缩
// gulp.task('minify-css', function() {
//     gulp.src('./src/css/*.css')
//         .pipe(minifyCSS())
//         .pipe(header(banner, {
//             pkg: pkg
//         }))
//         .pipe(gulp.dest('./dist/css/'))
// });

// SASS编译
// https://github.com/sindresorhus/gulp-autoprefixer/issues/8
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}))
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '.'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer({browsers: ['last 1 version','> 1%', 'iOS 6', 'ie 8', 'ie 7'], cascade: false}))
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '.'}))
        .pipe(gulp.dest('./src/css/'))
        .pipe(reload({stream:true}));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Clean file
// gulp.task('clean', function () {
//     return gulp.src('./dist')
//         .pipe(clean());
// });

//
// 默认任务
gulp.task('default', ['browser-sync'], function() {
    gulp.watch("./src/sass/**/*.scss", ['sass']);
    gulp.watch("./src/*.html", ['bs-reload']);
});
//
// 发布任务
// gulp.task('build', ['clean','minify-css'], function() {});
