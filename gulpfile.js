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
gulp.src('style.scss')
.pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
.pipe(gulp.dest('css'));
done();
});

gulp.task('js', function(done) {
gulp.src('main.js')
.pipe(uglify())
.pipe(concat('script.js'))
.pipe(gulp.dest('scripts'));
done();
});

gulp.task('watch', function(done) {
gulp.watch('main.js', gulp.series('js'));
gulp.watch('style.scss', gulp.series('sass'));
done();
});