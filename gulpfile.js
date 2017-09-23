var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var cache        = require('gulp-cached');
var combineMq    = require('gulp-combine-mq');
var concat       = require('gulp-concat');
var config       = require('./config.json');
var cssminifiy   = require('gulp-clean-css');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var pug          = require('gulp-pug');
var reload       = browserSync.reload;
var rename       = require('gulp-rename');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');





// > Manage task's errors
var onError = function (err) {
	gutil.beep();
	console.log(err);
};




/*
// > Copy Images
gulp.task('docs', function () {
	return gulp.src(config.docs.src)
		.pipe(gulp.dest(config.docs.dest))
		.pipe(notify({message: '>> ✔︎ Docs', onLast: true}));
});
*/




// > Copy Images
gulp.task('images', function () {
	return gulp.src(config.images.src)
		.pipe(gulp.dest(config.images.dest))
		.pipe(notify({message: '>> ✔︎ Images', onLast: true}));
});





// > Copy Vendor JS (Jquery, Modernizr..)
gulp.task('vendor-js', function () {
	return gulp.src(config.vendorJS.src)
		.pipe(gulp.dest(config.vendorJS.dest))
		.pipe(notify({message: '>> ✔︎ Vendor JS', onLast: true}));
});





// > Copy humansTXT
gulp.task('humansTXT', function () {
	return gulp.src(config.humansTXT.src)
		.pipe(gulp.dest(config.humansTXT.dest))
		.pipe(notify({message: '>> ✔︎ Humans txt', onLast: true}));
});





// > Process .PUG files into 'public' folder
gulp.task( 'templates' , function(cb) {
	return gulp.src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(pug({}))
		.pipe(gulp.dest(config.templates.dest))
		.pipe(notify({message: 'Templates OK', onLast: true}));
});






// > Process SASS/SCSS files to generate final css files in 'public' folder
gulp.task( 'styles' , function(cb) {
	return gulp.src(config.styles.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.pipe(combineMq({
			beautify: true
		}))
		.pipe(autoprefixer({
			browsers: [
				'last 2 versions',
				'ie >= 10'
			],
			cascade: false
		}))
		.pipe(gulp.dest(config.styles.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'CSS OK', onLast: true}));
});





// > Process plugins into a single JS file inside 'assets/js' folder
gulp.task('plugins', function(){
	return gulp.src(config.plugins.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('plugins.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.plugins.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'PLUGINS OK', onLast: true}));
});





// > Process JS scripts into a single JS file inside 'assets/js' folder
gulp.task('scripts', function(){
	return gulp.src(config.scripts.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'JS OK', onLast: true}));
});





// > Create a development server with BrowserSync
gulp.task('go', ['default'], function () {
	browserSync.init({
		server : {
			baseDir: "public"
		},
		ghostMode: false,
		online: true
	});
	gulp.watch(config.watch.images, ['bs-reload', ['images']]);
	gulp.watch(config.watch.vendorJS, ['bs-reload', ['vendor-js']]);
	gulp.watch(config.watch.humansTXT, ['humansTXT']);
	gulp.watch(config.watch.styles, ['styles']);
	gulp.watch(config.watch.scripts, ['scripts', 'plugins']);
	gulp.watch(config.watch.templates, ['templates']);
	gulp.watch(config.watch.html, ['bs-reload']);
});





// > Force a browser page reload
gulp.task('bs-reload', function () {
	browserSync.reload();
});





// > Generate 'public' folder
gulp.task('default', ['clean'], function (cb) {
	runSequence('styles', ['images', 'vendor-js', 'humansTXT', 'templates', 'plugins', 'scripts'], cb);
});




// > Delete Public folder
gulp.task('clean', del.bind(null, ['public']));
