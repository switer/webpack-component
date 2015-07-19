'use strict';

require('./home.css')
require('/c/header')

module.exports = new Reve({
	el: '.home',
	ready: function () {
		console.log('Home')
	}
})