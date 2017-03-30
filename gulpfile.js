/**
 * Created by zauri_000 on 30.03.2017.
 */

var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
  return gulp.src(['src/client/**/*.tsx', 'src/client/**/*.ts'])
  .pipe(tsProject())
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/client/**/*.ts', 'src/client/**/*.tsx'], ['default']);
});