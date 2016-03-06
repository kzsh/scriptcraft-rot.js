var config = require('./config/config'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify');

gulp.task('default', function() {
    gulp.start('plugins');
});

gulp.task('plugins', function() {
  return gulp.src('plugins/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(babel())
    .pipe(gulp.dest(`${config.serverPath}/scriptcraft/plugins/ROT_js`))
    .pipe(notify({ message: 'Plugins task complete' }));
});

gulp.task('watch', function() {
  gulp.watch('plugins/**/*.js', ['plugins']);
});
