const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-terser'),
    gulpFilter = require('gulp-filter'),
    css_nano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    print = require('gulp-print').default,
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    mainNodeFiles = require('gulp-main-node-files'),
    glob = require('glob'),
    browserSync = require('browser-sync'),
    styleNodeFiles = require('gulp-style-node-files');

const packageJson = require('./package.json');

const assetsDir = 'assets';

function watchJs() {
    gulp.watch([assetsDir + '/js/src/*.js'], gulp.parallel(jsTask, reload));
}
function watchCss() {
    gulp.watch([assetsDir + '/css/src/**/*.scss'], gulp.parallel(cssTask, reload));
}
function watchHtml() {
    gulp.watch("*.html").on("change", browserSync.reload);
}

function jsTask() {
    return gulp.src(assetsDir + '/js/src/*.js')
        .pipe(plumber({errorHandler: notify.onError("Klaida: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(concat('prod.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(assetsDir + '/js/'))
}

function cssTask() {
    return gulp.src(assetsDir + '/css/src/base.scss')
        .pipe(plumber({errorHandler: notify.onError("Klaida: <%= error.message %>")}))
        .pipe(sass(
            {
                sourceComments: 'map',
                sourceMap: 'sass',
                imagePath: 'images'
            }
        ))
        .pipe(css_nano({zindex: false, autoprefixer: true}))
        .pipe(rename('prod.css'))
        .pipe(gulp.dest(assetsDir + '/css/'))
        .pipe(browserSync.stream());
}

function pluginsTask() {
    return gulp.src(mainNodeFiles({
        overrides: {
            'sticky-kit': './dist/sticky-kit.js',
            'flatpickr' : ['dist/flatpickr.js', 'dist/l10n/lt.js']
        }
    }), { base: '.', allowEmpty: true })
        .pipe(print())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assetsDir + '/js/'))
}

function pluginsTaskCss() {
    return gulp.src(styleNodeFiles({
        overrides: {
            'rateyo': './min/jquery.rateyo.min.css',
            'tiny-slider': './dist/tiny-slider.css',
            'ion-rangeslider': './css/ion.rangeSlider.css',
        }
    }), { base: '.', allowEmpty: true })
        .pipe(print())
        .pipe(concat('vendor.css'))
        .pipe(css_nano({zindex: false, autoprefixer: false}))
        .pipe(gulp.dest(assetsDir + '/css/'))
}

// function pluginsTaskCss() {
//     const modules = Object.keys(packageJson.dependencies);
//
//     const moduleFiles = modules.map(function(module) {
//         if (glob.sync('node_modules/' + module + '/dist/').length !== 0) {
//             return 'node_modules/' + module + '/dist/*.css';
//         }
//         if (glob.sync('node_modules/' + module + '/min/').length !== 0) {
//             return 'node_modules/' + module + '/min/*.css';
//         }
//     });
//
//     return gulp.src(moduleFiles, { base: 'node_modules', allowEmpty: true })
//         .pipe(print())
//         .pipe(concat('vendor.css'))
//         .pipe(css_nano({zindex: false, autoprefixer: false}))
//         .pipe(gulp.dest(assetsDir + '/css/'))
// }

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done) {
    browserSync.init({
        //logLevel: "debug",
        server: {
            baseDir: './'
        }
    });
    done();
}

gulp.task('default', gulp.parallel(cssTask, jsTask, watchJs, watchCss));
gulp.task('html', gulp.parallel(cssTask, jsTask, watchJs, watchCss, watchHtml, serve));
gulp.task('compile', gulp.series(cssTask, jsTask));
gulp.task('vendor', gulp.series(pluginsTask, pluginsTaskCss));