var gulp = require('gulp')
var gulpWebPack = require('gulp-webpack')
var uglify = require('gulp-uglifyjs')
var concat = require('gulp-concat')
var webpack = require('webpack')

gulp.task('default', ['webpack'], function() {

    return gulp.src(['./lib/*.js', './dist/bundle.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify('bundle.min.js', {
            mangle: true,
            compress: true
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('webpack', function(cb) {
    return gulpWebPack({
        entry: './index.js',
        output: {
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /.*?\.tpl$/,
                loader: 'html-loader'
            }]
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\/c\/[\w\-\$]+$/, function(f) {
                var cname = f.request.match(/\/c\/([\w\-\$]+)$/)[1]
                f.request = cname + '/' + cname
                return f
            }),
            new webpack.BannerPlugin('Version 1.0.0')
        ],
        resolve: {
            modulesDirectories: ['c']
        }
    }).pipe(gulp.dest('./dist'))
})
