// DEPENDENCES
const gulp = require('gulp');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-csso');
const gulpIf = require('gulp-if');
const isDevelopment = true;
const del = require('gulp-clean');
const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');


// PATHS
const paths = {
  root: './build',
  templates: {
    pages: 'source/templates/pages/*.pug',
    src: 'source/templates/**/*.pug',
    dest: 'build/assets'
  },
  styles: {
    src: 'source/styles/**/*.scss',
    dest: 'build/assets/styles'
  },
  fonts: {
    src: 'source/fonts/**/*.*',
    dest: 'build/assets/fonts'
  },
  images: {
    src: 'source/images/**/*.*',
    dest: 'build/assets/images'
  },
  scripts: {
    src: 'source/scripts/**/*.js',
    dest: 'build/assets/scripts/'
  }
};

// PUG
function templates() {
	return gulp.src(paths.templates.pages)
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest(paths.root));
}


// STYLES
function styles() {
	return gulp.src('./source/styles/main.scss')
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(sass())
		.pipe(autoprefixer('last 5 versions'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest(paths.styles.dest))
}


// Fonts
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
}


// IMAGES
function images() {
	return gulp.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest));
}


// SCRIPTS
function scripts() {
  return gulp.src('source/scripts/app.js')
    .pipe(gulp.dest(paths.scripts.dest));
}



// WATCH
function watch() {
	gulp.watch(paths.templates.src, templates);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.scripts.src, scripts);
}


// CLEAN
function clean() {
  return gulp.src(paths.root, {read: false})
    .pipe(del());
}



// SERVER
function server() {
	browserSync.init({
		server: paths.root
	});
	browserSync.watch(paths.root + '/**/*.*', browserSync.reload)
}



exports.templates = templates;
exports.styles = styles;
exports.fonts = fonts;
exports.images = images;
exports.scripts = scripts;
exports.clean = clean;

// DEFAULT (GULP)
gulp.task('default', gulp.series(
  clean,
	gulp.parallel(templates, styles, fonts, images, scripts),
	gulp.parallel(watch, server)
	));