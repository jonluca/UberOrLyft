var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

/// Jshint task
gulp.task('jshint', function(){
	return gulp.src('./lib/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

/// Test task
gulp.task('test', function(){
	return gulp.src('./test/test.js')
	.pipe(mocha({ reporter: 'nyan' }));
});

/// default task to watch for changes
/// and run tests
gulp.task('default', function(){
	gulp.watch('./lib/*.js', ['jshint', 'test']);
});
