var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');

/*================================================
									JS
================================================*/
// minify JS

gulp.task('compress', function(){
	var jsfiles = ['js/*.js'];

	return gulp.src(jsfiles) //select this file.
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('js/min/'));
});

// auto watch documents mentioned and minify changes. 
gulp.task('watchjs', function() {
    gulp.watch('js/**/*.js', ['compress']);
});

/*================================================
									SASS
================================================*/
// convert sass to css

gulp.task('sass', function () {
  gulp.src('*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('*.scss', ['sass']);
});

/*================================================
									CSS
================================================*/
// minify the css

gulp.task('minify-css', function() {
  return gulp.src('css/styles.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'));
});	

// auto watch documents mentioned and minify changes. 
gulp.task('watchcss', function() {
    gulp.watch('css/*.css', ['minify-css']);
});




//call the functions
gulp.task('default',['compress', 'watchjs', 'minify-css', 'watchcss', 'sass', 'sass:watch'], function(){}); 

