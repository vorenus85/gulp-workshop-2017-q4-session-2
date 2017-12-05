# Css tasks with gulp
Work to the <b>start</b> folder, the solutions are in the <b>end</b> folder

## 1. Declare the sass plugin 

Type to gulpfile.js
```
var sass = require('gulp-sass');
```

## 2. Install gulp-sass plugin:
type to terminal:
```
npm install gulp-sass --save-dev
```

## 3. About .pipe()
* You can chain multiple tasks together using the ```pipe()``` method.
* readable stream .pipe( writeable stream ) and so on

## 4. Create sass task
type to gulpfile.js

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

declare gulp-plumber in your gulpfile.js

```var plumber = require('gulp-plumber');```

Install gulp-plumber in terminal:

```gulp gulp-plumber --save-dev```

Give this code your sass task

```
.pipe(plumber(function (err){
console.log('Sass task error');
console.log(err);
this.emit('end');
}))
```

## 6. Autoprefixer
* making css cross-browser

Declare autoprefixer in your gulpfile.js

```
var autoprefixer = require('gulp-autoprefixer');
```

Install autoprefixer in terminal

```
npm install gulp-autoprefixer --save-dev
```

Give this .pipe() to our sass task

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

* gulp-concat can merge one file into one file, or multiply files into one file

Declare gulp-concat in your gulpfile.js

```
var concat = require('gulp-concat');
```

Install gulp-concat through terminal

```
npm install gulp-concat --save-dev
```

Make static variables for concatenated filename

```
var minCss = 'style.min.css';
```

Give .pipe() into your sass task

```.pipe(concat(minCss))```

## 9. Sourcemaps

* Need and useful for debugging

Declare gulp-sourcemaps in your gulpfile.js

```
var sourcemaps = require('gulp-sourcemaps');
```

Give this .pipe() where your file content is NOT manipulated

```
.pipe(sourcemaps.init())
```

Give this .pipe() where our file content is FULLY manipulated ( before ```gulp.dest()``` )

```
.pipe(sourcemaps.write())
```

Sourcemaps save separately NOT into min.css 

```
.pipe(sourcemaps.write('./maps'))
```

## 10. Concat and minify Vendor css
To reduce your app requests, concat vendor css files into one, also minify and autoprefix them 

Declare these static variables
```
// vendor static variables
var distVendorCss = '../web/css/vendor';
var vendorCss = 'css/vendor/*.css';
var vendorPacksMin = 'vendor.packs.min.css';
```

## 11. Write vendor-css task
type to gulpfile.js

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

## 12. Modify index.html

this line
```
<link rel="stylesheet" href="web/css/style.css">
```

change to that:
```$xslt
<link rel="stylesheet" href="web/css/style.min.css">
```

remove these lines:
```$xslt
<link rel="stylesheet" href="src/css/vendor/font-awesome.min.css">
<link rel="stylesheet" href="src/css/vendor/owl.carousel.css">
<link rel="stylesheet" href="src/css/vendor/animate.css">
```

add this line:
```$xslt
<link rel="stylesheet" href="web/css/vendor/vendor.packs.min.css">
```