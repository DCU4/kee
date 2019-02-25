var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
// var notify = require('gulp-notify');

gulp.task('log', function(done) {
gutil.log('== My Log Task ==');
done();
});

gulp.task('sass', function(done) {
gulp.src('sass/**/*.scss')
.pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
.pipe(gulp.dest('css'));
done();
});

// gulp.task('sass', function() {
//     return gulp.src('sass/**/*.scss')
//     .pipe(sass().on("error", notify.onError("Error: <%= error.message %>")))
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions', 'ie >= 11'],
//         cascade: false
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('css'));
//   });

gulp.task('js', function(done) {
gulp.src('main.js')
.pipe(uglify())
.pipe(concat('script.js'))
.pipe(gulp.dest('scripts'));
done();
});

gulp.task('watch', function(done) {
gulp.watch('main.js', gulp.series('js'));
gulp.watch('sass/**/*.scss', gulp.series('sass'));
done();
});