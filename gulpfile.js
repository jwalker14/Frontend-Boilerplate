var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Include Our Plugins
var jshint    = require('gulp-jshint');
var compass   = require('gulp-compass');
var sass   = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var rename    = require('gulp-rename');
var rev       = require('gulp-rev');
var path      = require('path');
var useref = require('gulp-useref');

var paths = {
    dest: 'src'
};

// Lint Task
gulp.task('lint', function() {
    return gulp.src('scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('compass', function() {
    gulp.src('./sass/*.scss')
    .pipe(compass({
        project: __dirname+'',
        import_path: ['bower_components', 'bower_components/foundation-sites/scss', 'bower_components/font-awesome/scss'],
        css  : 'styles',
        sass : 'sass',
        image: 'sass/images'
    }))
    .pipe(gulp.dest('styles'))
    .pipe(browserSync.stream());
});

// //SASS
// gulp.task('sass', function() {
//     return gulp.src('src/sass/style.scss')
//         .pipe(sass({ includePaths : [
//                 'bower_components/foundation-sites/scss',
//          ], outputStyle: 'expanded'}).on('error', sass.logError))
//         .pipe(gulp.dest('styles/'))
// });


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('/scripts/**/*.js')
        .pipe(concat('global.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('global.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/**/*.scss", ['compass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('./scripts/**/*.js', ['lint', 'scripts']);
});

gulp.task('build', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['lint', 'compass', 'scripts', 'watch']);