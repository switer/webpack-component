'use strict';

var gulp = require('gulp')
var path = require('path')
var uglify = require('gulp-uglifyjs')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var hash = require('gulp-hash')
var merge2 = require('merge2')
var gulpFilter = require('gulp-filter')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var save = require('./tasks/save')
var HASH_LENGTH = 6

gulp.task('default', function() {

    var onlyCss
    var cssFilter = gulpFilter(['*.js', '!*.css'])
    var jsFilter = gulpFilter(['**/*', '!*.js'])
    var distDir = path.join(__dirname, './dist')

    return merge2(
                /**
                 * clean up old files
                 */
                gulp.src('./dist', {read: false}).pipe(clean()),
                
                /**
                 * using webpack build component modules
                 */
                require('./tasks/components-build')({
                    hashLength: HASH_LENGTH,
                    dist: distDir,
                    entry: path.join(__dirname, './index.js')
                })
                .pipe(jsFilter)
                .pipe(save('components:css,images'))
                .pipe(gulpFilter(['*.css']))
                .pipe(cssmin())
                .pipe(rename({suffix: '.min'}))
                .pipe(save('components:css.min'))
                .pipe(jsFilter.restore())
                .pipe(cssFilter),

                /**
                 * concat component js bundle with lib js
                 */
                gulp.src(['./lib/*.js'])
            )
            .pipe(concat('bundle.js'))
            .pipe(hash({
                hashLength: HASH_LENGTH,
                template: '<%= name %>_<%= hash %><%= ext %>'
            }))
            .pipe(save('bundle:js'))
            .pipe(uglify('bundle.min.js', {
                mangle: true,
                compress: true
            }))
            .pipe(hash({
                hashLength: HASH_LENGTH,
                template: '<%= name %>_<%= hash %><%= ext %>'
            }))
            .pipe(save.restore('components:css,images'))
            .pipe(save.restore('components:css.min'))
            .pipe(save.restore('bundle:js'))
            .pipe(gulp.dest(distDir))
})

