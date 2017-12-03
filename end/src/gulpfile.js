var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

// static variables
var srcScss = 'scss/style.scss';
var distCss = '../web/css';

gulp.task('sass', function(){
    console.log('starting sass task');
    return gulp.src(srcScss)
    .pipe(plumber(function (err){
      console.log('Sass task error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sass({})) // Converts Sass to Css with gulp sass
    .pipe(gulp.dest(distCss));
});