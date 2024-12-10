var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	gutil  = require('gulp-util');

gulp.task('coffee', function() {
	gulp.src([ './src/**/!(Game)*.coffee', './src/Game.coffee' ])
		.pipe(coffee({ bare: true }).on('error', gutil.log))
		.pipe(concat('le-sorcier.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.coffee', [ 'coffee' ]);
});
