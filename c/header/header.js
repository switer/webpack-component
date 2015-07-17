'use strict';

var tpl = require('./header.tpl')
console.log(tpl)
module.exports = Reve.component('header', {
	template: tpl,
	data: function () {
		return {
			title: 'Header'
		}
	}
})