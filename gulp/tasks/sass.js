var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  gulp.src('./presentation/slides/all.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
	 	errLogToConsole: true,
	 	// outputStyle: 'compressed'
	}))
	.pipe(prefix("last 3 version", "> 1%", "ie 8"))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./presentation/css'));
})

gulp.task('default', ['sass'], function () {
	gulp.watch('./presentation/{,**/*}*.{scss,sass}', ['sass'])
});