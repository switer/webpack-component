'use strict';

var fs = require('fs')
var path = require('path')

module.exports = function (source) {
	return 'module.exports = ' + JSON.stringify(source)
}