"use strict";

// 加载插件
var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    header = require('gulp-header'),
    uglify = require('gulp-uglify'),
    moment = require('moment'),
    reload = browsersync.reload;

// 注释格式
var pkg = require('./package.json');
var banner = '/*!' + '\n * @project : ' + pkg.name + '\n * @version : ' + pkg.version + '\n * @author  : ' + pkg.author + '\n * @update  : ' + moment().format('YYYY-MM-DD h:mm:ss a') + '\n */\r';

// 启动服务
gulp.task('browser-sync', function() {
    browsersync({
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

// 脚本压缩
gulp.task('uglify', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
});

// 样式压缩
gulp.task('minify-css', function() {
    gulp.src('./src/css/*.css')
        .pipe(minifycss())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist/css/'))
});

// SASS编译
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./src/css/'))
        .pipe(reload({
            stream: true
        }));
});
//
// 默认任务
gulp.task('default', ['browser-sync'], function() {
    gulp.watch("./src/sass/**/*.scss", ['sass']);
    gulp.watch("./src/*.html", ['fileinclude']);
});
//
// 发布任务
gulp.task('build', ['minify-css'], function() {});
