"# gulp-workshop-2017-q4-session-2"

# 1. deklaráljuk a sass plugint a gulpfile.js-ben
```
var sass = require('gulp-sass');
```

# 2. telepítsük a gulp-sass plugint:
```
npm install gulp-sass --save-dev
```

# 3. Pár szó a .pipe() ról
* több taskot egymás után tudunk fűzni
* readableTask.pipe( writeableTask)

# 4. Írjuk meg a sass taskunkat
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

# 5. Gulp-plumber
* Why useful? 
* Prevent pipe breaking caused by errors

defuniáljuk a plumber csomagot

```var plumber = require('gulp-plumber');```

telepítsük a gulp-plumber csomagot

```gulp gulp-plumber --save-dev```

adjunk hozzá a taskunkhoz a következő kódot

```
.pipe(plumber(function (err){
console.log('Sass task error');
console.log(err);
this.emit('end');
}))
```

# 6. Autoprefixer
* making css cross-browser

Definiáljuk az autoprefixer csomagot

```
var autoprefixer = require('gulp-autoprefixer');
```

Telepítsük az autoprefixer csomagot

```
npm install gulp-autoprefixer --save-dev
```

helyezzük el a kódunkba:

```
.pipe(autoprefixer({
browsers: ['last 2 versions'],
cascade: false
}))
```

# 7. Sass-minify
a sass pipe-nál használjuk a következő paramétert

```
.pipe(sass({
outputStyle: 'compressed'
}))
```

# 8. Concat one file

* Egy vagy több fájlt össze tudunk fűzni egybe

definiáljuk a concat csomagot

```
var concat = require('gulp-concat');
```

Telepítsük a concat csomagot

```
npm install gulp-concat --save-dev
```

Hozzuk létre a minCss változót

```
var minCss = 'style.min.css';
```

Tegyük be a concat pipe-ot a kódba

```.pipe(concat(minCss))```

# 9. Sourcemaps

* Need for debugging

definiáljuk a sourcemaps csomagot

```
var sourcemaps = require('gulp-sourcemaps');
```

tegyük be a kódba ezt a pipe-ot oda ahol még nem fog változni a fájl tartalma

```
.pipe(sourcemaps.init())
```

tegyük be a kódba ezt a pipe-ot oda ahol már megtörtént minden változtatás

```
.pipe(sourcemaps.write())
```

Ne a min.css-be kerüljön a sourcemaps hanem egy külön fájlba

```
.pipe(sourcemaps.write('./maps'))
```

# 10. Concat and minify Vendor css
csökkentsük a requestek számát a vendor css-eket concat tegyük egy fájlba, minify-oljuk, autoprefixeljük

hozzuk létre a következő változókat
```
// vendor static variables
var distVendorCss = '../web/css/vendor';
var vendorCss = 'css/vendor/*.css';
var vendorPacksMin = 'vendor.packs.min.css';
```