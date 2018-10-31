const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

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

//Transpile and Minify scripts
gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('script.js'))
		.pipe(minify({
			mangle: {
				keepClassName: true
			}
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

//Compile Sass
gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

//Run build tasks
gulp.task('build', ['html','imagemin','sass', 'scripts']);

//Watch files for changes
gulp.task('watch', function(){
	browserSync.init({
		server: {
            baseDir: "./dist/"
        }
		// proxy: 'localhost/gulp-starter/dist/index.html'
    });
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/images/*', ['imagemin']);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
});