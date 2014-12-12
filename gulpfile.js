var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var es6ify = require('es6ify');
var concat = require('gulp-concat');
var path = require('path');

gulp.task('watch', function(){
    gulp.watch(['src/app/index.html', 'src/app/index.js'], ['compile-index']);
    gulp.watch('src/app/img/', ['compile-images']);
    gulp.watch('src/app/script/**/*.js', ['compile-scripts']);
    gulp.watch('src/app/style/', ['compile-styles']);
    gulp.watch('src/app/view/', ['compile-views']);
});

gulp.task('default', ['compile']);

gulp.task('compile', ['compile-index', 'compile-images', 'compile-scripts', 'compile-styles', 'compile-views'], function(){
    gulp.src('src/app/vendor/**')
        .pipe(gulp.dest('dist/app/vendor/'));
});

gulp.task('compile-index', function(){
    gulp.src(['src/app/index.html', 'src/app/index.js'])
        .pipe(gulp.dest('dist/app/'))
});

gulp.task('compile-images', function(){
    gulp.src('src/app/img/**')
        .pipe(gulp.dest('dist/app/img/'));
});

gulp.task('compile-scripts', function(){
    var compile = transform(function(filename) {
        var bundler = browserify(filename, {
            insertGlobals: true,
            debug: true
        });
        bundler.transform(es6ify);
        return bundler.bundle();
    });

    gulp.src(['src/app/script/**/*.js'])
        .pipe(compile)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/app/script/'));
});

gulp.task('compile-styles', function(){
    gulp.src('src/app/style/**/*.css')
        .pipe(gulp.dest('dist/app/style/'));
});

gulp.task('compile-views', function(){
    gulp.src('src/app/view/**')
        .pipe(gulp.dest('dist/app/view/'));
});

