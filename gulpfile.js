const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

//Logs message
gulp.task('message', function(){
	return console.log('Gulp is running...');
});

//Copy all HTML files
gulp.task('html', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

//Optimize images
gulp.task('imagemin', function(){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

//Minify scripts
gulp.task('minify', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

//Compile Sass
gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
});

//Concat scripts
gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

//Run build tasks
gulp.task('build', ['html','imagemin','sass', 'scripts']);

//Watch files for changes
gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/images/*', ['imagemin']);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/*.html', ['html']);
});