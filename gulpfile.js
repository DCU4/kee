var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('log', function(done) {
gutil.log('== My Log Task ==');
done();
});

gulp.task('sass', function(done) {
gulp.src('sass/**/*.scss')
.pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
.pipe(gulp.dest('public/css'));
done();
});

gulp.task('js', function(done) {
gulp.src('js/*.js')
.pipe(uglify().on('error', function(e){
    console.log(e);
    }))
.pipe(concat('script.js'))
.pipe(gulp.dest('public/scripts'));
done();
});

gulp.task('watch', function(done) {
gulp.watch('js/*.js', gulp.series('js'));
gulp.watch('sass/**/*.scss', gulp.series('sass'));
done();
});