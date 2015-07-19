var gulp = require('gulp')
var gulpWebPack = require('gulp-webpack')
var uglify = require('gulp-uglifyjs')
var concat = require('gulp-concat')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var clean = require('gulp-clean')
var hash = require('gulp-hash')
var ComponentPlugin = require('./plugins/component')

var HASH_LENGTH = 6

gulp.task('default', ['before', 'components'], function() {

    return gulp.src(['./lib/*.js', './dist/components.js'])
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

gulp.task('before', function () {
    return gulp.src('./dist', {read: false})
                .pipe(clean())
})
gulp.task('components', function(cb) {
    return gulpWebPack({
        entry: './index.js',
        output: {
            filename: 'components.js'
        },
        module: {
            preLoaders: [{
                test: /\/c\/[^\/]+\/[^\/]+\.js/,
                loader: 'component'
            }],
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
            new ComponentPlugin(),
            new webpack.NormalModuleReplacementPlugin(/^\/c\/[^\/]+$/, function(f) {
                var cname = f.request.match(/\/c\/([\w\-\$]+)$/)[1]
                f.request = cname + '/' + cname
                return f
            }),
            new webpack.BannerPlugin('Version 1.0.0'),
            new ExtractTextPlugin('bundle_[hash:' + HASH_LENGTH +  '].css')
        ],
        resolve: {
            modulesDirectories: ['c']
        }
    }).pipe(gulp.dest('./dist'))
})
