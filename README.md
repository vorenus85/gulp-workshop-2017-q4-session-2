"# gulp-workshop-2017-q4-session-2"

## 1. Declare the sass plugin in our gulpfile.js
```
var sass = require('gulp-sass');
```

## 2. Install gulp-sass plugin:
```
npm install gulp-sass --save-dev
```

## 3. About .pipe()
* You can chain multiple tasks together using the ```pipe()``` method.
* readable stream .pipe( writeable stream ) and so on

## 4. Write our sass task
```
// static variables
var srcScss = 'scss/style.scss';
var distCss = '../web/css';

gulp.task('sass', function(){
   return gulp.src(srcScss)
   .pipe(sass()) // Converts Sass to Css with gulp sass
   .pipe(gulp.dest(distCss));
});
```

## 5. Gulp-plumber
* Prevent pipe breaking caused by errors

declare gulp-plumber in our gulpfile.js

```var plumber = require('gulp-plumber');```

Install gulp-plumber

```gulp gulp-plumber --save-dev```

Give this code our sass task

```
.pipe(plumber(function (err){
console.log('Sass task error');
console.log(err);
this.emit('end');
}))
```

## 6. Autoprefixer
* making css cross-browser

Declare autoprefixer in out gulpfile.js

```
var autoprefixer = require('gulp-autoprefixer');
```

Install autoprefixer

```
npm install gulp-autoprefixer --save-dev
```

Give this pipe to our sass task

```
.pipe(autoprefixer({
browsers: ['last 2 versions'],
cascade: false
}))
```

## 7. Sass-minify
use compressed output with gulp-sass

```
.pipe(sass({
outputStyle: 'compressed'
}))
```

## 8. Concat one file into one file

* Gulp concat can merge one file into one file, or multiply file into one file

Declare gulp-comcat in our gulpfile.js

```
var concat = require('gulp-concat');
```

Install gulp-concat

```
npm install gulp-concat --save-dev
```

Make static variables for concatenated filename

```
var minCss = 'style.min.css';
```

Give pipe into our sass task

```.pipe(concat(minCss))```

## 9. Sourcemaps

* Need and useful for debugging

Declare gulp-sourcemaps in our gulpfile.js

```
var sourcemaps = require('gulp-sourcemaps');
```

Give this pipe where our file content is NOT manipulated

```
.pipe(sourcemaps.init())
```

Give this pipe where our file content is FULLY manipulated

```
.pipe(sourcemaps.write())
```

Sourcemaps save separately NOT into min.css 

```
.pipe(sourcemaps.write('./maps'))
```

## 10. Concat and minify Vendor css
To reduce out app requests, concat vendor css files into one, also minify and autoprefix them 

Declare these static variables
```
// vendor static variables
var distVendorCss = '../web/css/vendor';
var vendorCss = 'css/vendor/*.css';
var vendorPacksMin = 'vendor.packs.min.css';
```

## 11. Write out vendor-css task

```
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
```