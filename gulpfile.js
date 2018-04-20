const browserify = require('browserify');
const fs = require('fs');
const vueify = require('vueify');
const gulp = require('gulp');

gulp.task('build', function(){
   var mainJS = browserify('./public/js/src/main.js');

   mainJS.transform(vueify)
      .transform('uglifyify', {global: true})
      .bundle()
      .pipe(fs.createWriteStream('./public/js/dist/main.js'));
});

gulp.watch(['./public/js/src/main.js', './public/js/src/components/*.vue'], ['build']);

gulp.task('default', ['build']);