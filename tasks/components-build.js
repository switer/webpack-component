'use strict';

var gulp = require('gulp')
var webpack = require('webpack')
var gulpWebPack = require('gulp-webpack')
var gulpFilter = require('gulp-filter')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var ComponentPlugin = require('../plugins/component')


module.exports = function componentsBuild(options) {
	var HASH_LENGTH = options.hashLength
	var distDir = options.dist
	var entry = options.entry || './index'
	var jsFilter = gulpFilter(['**/*', '!*.js'])

    return gulpWebPack({
            entry: entry,
            output: {
                filename: 'components.js'
            },
            module: {
                preLoaders: [{
                    test: /[\/\\]c[\/\\][^\/\\]+[\/\\][^\/\\]+\.js/,
                    loader: 'component'
                }],
                loaders:[{
                    test: /.*?\.tpl$/,
                    loader: 'html-loader'
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("css-loader")
                }, {
                    test: /\.(png|jpg|gif|jpeg|webp)$/,
                    loader: "file-loader?name=[path][name]_[hash:" + HASH_LENGTH + "].[ext]"
                }]
            },
            resolveLoader: {
                modulesDirectories: ['loaders', 'node_modules']
            },
            plugins: [
                new ComponentPlugin(),
                new webpack.NormalModuleReplacementPlugin(/^[\/\\]c[\/\\][^\/\\]+$/, function(f) {
                    var cname = f.request.match(/[\/\\]c[\/\\]([\w\-\$]+)$/)[1]
                    f.request = cname + '/' + cname
                    return f
                }),
                new webpack.BannerPlugin('Version 1.0.0'),
                new ExtractTextPlugin('bundle_[hash:' + HASH_LENGTH +  '].css')
            ],
            resolve: {
                modulesDirectories: ['c']
            }
        })
        .pipe(jsFilter)
        .pipe(gulp.dest(distDir))
        .pipe(gulpFilter(['*.css']))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(distDir))
        .pipe(jsFilter.restore())
        .pipe(gulpFilter(['*.js', '!*.css']))
}