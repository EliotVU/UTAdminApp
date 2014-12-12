var gulp = require('gulp');
var transform = require('vinyl-transform');
var es6ify = require('es6ify');
var concat = require('gulp-concat');

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

var browserify = transform(function(filename) {
    var browserify = require('browserify');
    return browserify(filename, {debug: true})
        .add(es6ify.runtime)
        .transform(es6ify)
        .bundle();
});

gulp.task('compile-scripts', function(){
    gulp.src(['src/app/script/**/*.js'])
        .pipe(browserify)
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

