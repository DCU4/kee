var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();
    var reload      = browserSync.reload;
    const babel = require('gulp-babel');


gulp.task('log', function(done) {
    gutil.log('== My Log Task ==');
    done();
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: "./"
        // or
        // proxy: 'index.html'
    });
    gulp.watch('sass/**/*.scss').on('change',reload);

});

gulp.task('sass', function(done) {

    gulp.src('sass/**/*.scss')
    .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
    done();
});

gulp.task('js', function(done) {
    gulp.src('js/*.js')
  //   .pipe(babel({
  //     presets: ['@babel/env']
  // }))
    // .pipe(uglify({ compress: true }).on('error', function(e){
    //     console.log(e);
    //     }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('public/scripts'));
    done();
});

gulp.task('watch', function(done) {
    gulp.watch('js/*.js', gulp.series('js'));
    gulp.watch('sass/**/*.scss', gulp.series('sass'));
    gulp.watch('sass/**/*.scss',gulp.series('browser-sync'));
    done();
});