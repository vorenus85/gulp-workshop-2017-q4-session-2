var gulp = require('gulp');
var sass = require('gulp-sass');

// static variables
var srcScss = 'scss/style.scss';
var distCss = '../web/css';

gulp.task('sass', function(){
    return gulp.src(srcScss)
    .pipe(sass({})) // Converts Sass to Css with gulp sass
    .pipe(gulp.dest(distCss));
});