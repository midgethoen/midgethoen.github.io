var gulp       = require('gulp'),
    rollup     = require('gulp-rollup'),
    sourcemaps = require('gulp-sourcemaps');
    babel      = require('rollup-plugin-babel');

gulp.task('bundle', function(){
  gulp.src('src/index.js', {read: false})
    .pipe(rollup({
        sourceMap: true,
        format: 'UMD',
        plugins: [ babel() ]
    }))
    .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true 
    .pipe(gulp.dest('dist'));
});
