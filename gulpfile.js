const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const uglify = require('gulp-uglify');

const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const groupMediaCss = require('gulp-group-css-media-queries');

const ttf2woff2 = require('gulp-ttf2woff2');

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const svgmin = require('gulp-svgmin');



const paths = {
    css: {
        src: 'app/css/*.css',
        dest: 'dist/css'
    },
    js: {
        src: 'app/js/*.js',
        dest: 'dist/js'
    },
    font: {
        src: 'app/fonts/*.ttf',
        dest: 'dist/fonts'
    },
    images: {
        src: 'app/images/**/*.{jpg,png}',
        dest: 'dist/images'
    },
    svgs: {
        src: 'app/images/*.svg',
        dest: 'dist/images'
    }
};

const autoprefixerOptions = {
    overrideBrowserslist: ['last 3 versions', '> 1%', 'IE 10'],
    cascade: false
};

const cleanCSSOptions = {
    level: {
        1: {
            specialComments: 0
        }
    }
};

function styles() {
    return gulp
        .src(paths.css.src)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "CSS Error",
                message: "Помилка обробки CSS: <%= error.message %>"
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(groupMediaCss())
        .pipe(gulp.dest(paths.css.dest))
        .pipe(cleanCSS(cleanCSSOptions))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest))
}

function scripts() {
    return gulp
        .src(paths.js.src)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "JavaScript Error",
                message: "Помилка обробки JS: <%= error.message %>"
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
}

function convertFonts() {
    return gulp
        .src([paths.font.src], {
            encoding: false,
            removeBOM: false,
        })
        .pipe(ttf2woff2())
        .pipe(gulp.dest(paths.font.dest));
}

function svgs() {
    return gulp
        .src(paths.svgs.src)
        .pipe(svgmin({
            plugins: [{
                removeDoctype: false
            }, {
                removeComments: false
            }, {
                cleanupNumericValues: {
                    floatPrecision: 2
                }
            }, {
                convertColors: {
                    names2hex: false,
                    rgb2hex: false
                }
            }]
        }))
        .pipe(gulp.dest(paths.svgs.dest))
}

function optimizeImages() {
    return imagemin([paths.images.src], {
        destination: paths.images.dest,
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({
                quality: [0.6, 0.8]
            }),
            imageminWebp({ quality: 50 })
        ]
    }).then(files => {
        console.log('Images optimized:', files);
    });
}

function watchFiles() {
    gulp.watch(paths.css.src, styles);
    gulp.watch(paths.js.src, scripts);
}

exports.fonts = convertFonts;
exports.styles = styles;
exports.scripts = scripts;

exports.svgs = svgs;
exports.images = optimizeImages;



exports.watch = watchFiles;
exports.media = gulp.series(svgs, optimizeImages);
exports.build = gulp.series(styles, scripts, svgs, optimizeImages, convertFonts);
