var config = require('./config/config'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    merge = require('merge-stream');

gulp.task('default', function() {
    gulp.start('build');
});

gulp.task('build', function() {
  var plugins = gulp.src('plugins/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(babel())
    .pipe(gulp.dest('build/'));

  var rot = gulp.src('node_modules/rot-js/lib/rot.js')
    .pipe(gulp.dest('build/'));
    return merge(plugins, rot)
      .pipe(notify({ message: 'build complete' }));
});

gulp.task('dist', ['build'], function () {
    return gulp.src('build/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/'))
      .pipe(notify({ message: 'dist complete' }));
});

gulp.task('export', ['dist'], function () {
  gulp.src('dist/**/*.js')
    .pipe(gulp.dest(`${config.serverPath}/scriptcraft/plugins/ROT_js`))
    .pipe(notify({ message: ['export complete'] }));
});

gulp.task('watch', function() {
  gulp.watch('plugins/**/*.js', ['export']);
});
