'use strict';

require('./header.css')

var tpl = require('./header.tpl')

module.exports = Reve.component('header', {
	template: tpl,
	data: function () {
		return {
			title: 'Header'
		}
	}
})