"use strict";
// http://pinkyjie.com/2015/03/24/refactor-your-gulpfile/
// 加载插件
var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS    = require('gulp-minify-css'),
    header       = require('gulp-header'),
    moment       = require('moment'),
    minifyHTML   = require('gulp-minify-html'),
    uglify       = require('gulp-uglify'),
    reload       = browserSync.reload,
    del          = require('del'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    ejs          = require('gulp-ejs');
    // rename       = require("gulp-rename");

// 配置路径
// https://github.com/mikestreety/gulp/blob/master/gulpfile.js
var path = {

    css: {
        src: './src/css/',
        dist: './dist/css/'
    },
    sass: {
        src: './src/sass/',
        dist: './dist/sass/'
    },
    js: {
        src: './src/js/',
        dist: './dist/js/'
    },
    img: {
        src: './src/img/',
        dist: './dist/img/'
    }

};

// 注释格式
// /*!
//  * @project : pkg.name
//  * @version : pkg.version
//  * @author  : pkg.author
//  * @update  :
//  */
var pkg = require('./package.json');
var banner = '/*!' + '\n * @project : ' + pkg.name + '\n * @version : ' + pkg.version + '\n * @author  : ' + pkg.author + '\n * @update  : ' + moment().format('YYYY-MM-DD HH:mm:ss a') + '\n */\r';

// 启动服务
// 自动启动Chrome浏览器
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./",
            directory: true
        },
        notify: false,
        port: 8080,
        open: "external",
        browser: "google chrome"
    });
});



// SASS编译
// https://github.com/sindresorhus/gulp-autoprefixer/issues/8
// http://kevingimbel.com/snippet-source-maps-gulp/
// http://whiskers.nukos.kitchen/2014/12/06/gulp-notify.html
// http://stackoverflow.com/questions/22787673/gulp-sass-error-with-notify
gulp.task('sass', function() {
    return gulp.src(path.sass.src+'**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCSS({"compatibility": "ie7"}))
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(autoprefixer())
        .pipe(minifyCSS({"compatibility": "ie7"}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.css.src))
        .pipe(reload({
            stream: true
        }))
        .pipe(notify({
            message: '✌️SASS任务编译通过'
        }));
});

// 压缩HTML
gulp.task('minify-html', function() {
    //var opts = {empty:true,cdata:true,comments:true,conditionals:true,spare:true,quotes:true};
    var opts = {};
    gulp.src('./src/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'))
});
// 样式压缩
gulp.task('minify-css', function() {
    gulp.src('./src/css/*.css')
        .pipe(minifyCSS({"compatibility": "ie7"}))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist/css/'))
});
// 压缩脚本
gulp.task('compress', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist/js/'))
});
// 压缩图片
gulp.task('minify-img', function () {
    return gulp.src('./src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img/'));
});


// Reload all Browsers
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// Clean file
gulp.task('clean', function() {
    del.sync(['./dist/**']);
});

// ejs解析
gulp.task('ejs', function() {
    return gulp.src('src/tpl/**/*.ejs')
        .pipe(ejs({
          msg: "Hello Gulp!"
        }))
        .pipe(gulp.dest('./src/'))
        .pipe(reload({stream:true}))
});

// 默认任务
gulp.task('default', ['browser-sync'], function() {
    gulp.watch(path.sass.src + '**/*.scss', ['sass']);
    gulp.watch('./src/tpl/**/*.ejs', ['ejs']);
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
    gulp.watch('./src/**/*.js').on('change', browserSync.reload);
    gulp.watch('./src/**/*.png').on('change', browserSync.reload);
    gulp.watch('./src/**/*.jpg').on('change', browserSync.reload);
});

// 发布任务
gulp.task('build', ['clean', 'minify-css','minify-html','compress','minify-img']);
