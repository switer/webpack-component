var gulp = require('gulp')
var gulpWebPack = require('gulp-webpack')
var uglify = require('gulp-uglifyjs')
var concat = require('gulp-concat')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var clean = require('gulp-clean')
var hash = require('gulp-hash')
var merge2 = require('merge2')
var gulpFilter = require('gulp-filter')
var cssmin = require('gulp-cssmin')
var ComponentPlugin = require('./plugins/component')
var rename = require('gulp-rename')
var HASH_LENGTH = 6

gulp.task('default', ['vfe_before_build'], function() {

    return merge2(componentsBuild(), gulp.src(['./lib/*.js']))
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

gulp.task('vfe_before_build', function () {
    return gulp.src('./dist', {read: false})
                .pipe(clean())
})
function componentsBuild() {
    var jsFilter = gulpFilter(['**/*', '!*.js'])
    return gulpWebPack({
            entry: './index.js',
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
        .pipe(gulp.dest('./dist'))
        .pipe(gulpFilter(['*.css']))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'))
        .pipe(jsFilter.restore())
        .pipe(gulpFilter(['*.js', '!*.css']))
}