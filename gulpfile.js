var gulp = require('gulp');

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
    gulp.src('src/sass/style.scss')
    .pipe(compass({
        project: __dirname+'/src',
        import_path: ['bower_components', 'bower_components/foundation-sites/scss'],
        css  : 'styles',
        sass : 'sass',
        image: 'sass/images'
    }))
    .pipe(minifyCSS())
    .pipe(rename('style-global.css'))
    .pipe(gulp.dest('styles'));
});

//SASS
gulp.task('sass', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(sass({ includePaths : [
                'src/bower_components/foundation-sites/scss',
         ], outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('src/styles/'))
});


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
    gulp.watch('./src/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('./src/sass/*.scss', ['compass']);
});

// Default Task
gulp.task('default', ['lint', 'compass', 'scripts', 'watch']);