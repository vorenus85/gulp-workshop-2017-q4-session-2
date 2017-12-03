var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


// static variables
var srcScss = 'scss/style.scss';
var distCss = '../web/css';
var minCss = 'style.min.css';
// vendor static variables
var distVendorCss = '../web/css/vendor';
var vendorCss = 'css/vendor/*.css';
var vendorPacksMin = 'vendor.packs.min.css';

gulp.task('sass', function(){
    console.log('starting sass task');
    return gulp.src(srcScss)
    .pipe(plumber(function (err){
      console.log('Sass task error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sass({
        outputStyle: 'compressed'
    })) // Converts Sass to Css with gulp sass
    .pipe(concat(minCss))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(distCss));
});

gulp.task('vendor-css', function(){
   return gulp.src(vendorCss)
   .pipe(plumber(function (err){
       console.log('Sass task error');
       console.log(err);
       this.emit('end');
   }))
   .pipe(concat(vendorPacksMin))
   .pipe(autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
   }))
   .pipe(sass({
       outputStyle: 'compressed'
   })) // Converts Sass to Css with gulp sass
   .pipe(gulp.dest(distVendorCss));
   
});