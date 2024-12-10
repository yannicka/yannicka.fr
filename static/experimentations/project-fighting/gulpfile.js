var gulp = require('gulp'),
	stylus = require('gulp-stylus');

// Application
gulp.task('skew', function() {
	// à faire
});

// Style
gulp.task('stylus', function() {
	gulp.src([ './web/stylus/style.styl' ])
		.pipe(stylus({ compress: true, 'include css': true }))
		.pipe(gulp.dest('./web/css'));
});

// « Watcher »
gulp.task('watch', function() {
	gulp.watch('./web/app/**/*.sk', [ 'skew' ]);
	gulp.watch('./web/stylus/**/*.styl', [ 'stylus' ]);
});
