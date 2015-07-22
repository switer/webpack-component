var gulp = require('gulp')
var path = require('path')
var uglify = require('gulp-uglifyjs')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var hash = require('gulp-hash')
var merge2 = require('merge2')
var HASH_LENGTH = 6

gulp.task('default', function() {

    return merge2(
                gulp.src('./dist', {read: false}).pipe(clean()),
                require('./tasks/components-build')({
                    hashLength: HASH_LENGTH,
                    dist: path.join(__dirname, './dist'),
                    entry: path.join(__dirname, './index.js')
                }),
                gulp.src(['./lib/*.js'])
            )
            .pipe(concat('bundle.js'))
            .pipe(hash({
                hashLength: HASH_LENGTH,
                template: '<%= name %>_<%= hash %><%= ext %>'
            }))
            .pipe(gulp.dest('./dist'))
            .pipe(uglify('bundle.min.js', {
                mangle: true,
                compress: true
            }))
            .pipe(hash({
                hashLength: HASH_LENGTH,
                template: '<%= name %>_<%= hash %><%= ext %>'
            }))
            .pipe(gulp.dest('./dist'))
})