var gulp = require('gulp')
var gulpWebPack = require('gulp-webpack')
var uglify = require('gulp-uglifyjs')
var concat = require('gulp-concat')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var clean = require('gulp-clean')
var rev = require('gulp-rev')

gulp.task('default', ['before', 'webpack'], function() {

    return gulp.src(['./lib/*.js', './dist/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
        .pipe(uglify('bundle.min.js', {
            mangle: true,
            compress: true
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
})

gulp.task('before', function () {
    return gulp.src('./dist', {read: false})
                .pipe(clean())
})
gulp.task('webpack', function(cb) {
    return gulpWebPack({
        entry: './index.js',
        output: {
            filename: 'bundle-[hash].js'
        },
        module: {
            loaders:[{
                test: /.*?\.tpl$/,
                loader: 'html-loader'
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },]
        },
        resolveLoader: {
            modulesDirectories: ['loaders', 'node_modules']
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\/c\/[\w\-\$]+$/, function(f) {
                var cname = f.request.match(/\/c\/([\w\-\$]+)$/)[1]
                f.request = cname + '/' + cname
                return f
            }),
            new webpack.BannerPlugin('Version 1.0.0'),
            new ExtractTextPlugin("bundle-[hash].css")
        ],
        resolve: {
            modulesDirectories: ['c']
        }
    }).pipe(gulp.dest('./dist'))
})
