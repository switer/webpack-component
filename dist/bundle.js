/**
* Reve v1.0.1
* (c) 2015 guankaishe
* Released under the MIT License.
*/
!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):"object"==typeof exports?exports.Reve=b():a.Reve=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";function d(a){var b=this,c=a.ready,d=a.created,e=a.shouldUpdate,f=this.$directives=[],g=this.$components=[];this.$update=function(){e&&e.apply(b,arguments)===!1||(g.forEach(function(a){a.$update()}),f.forEach(function(a){a.$update()}))};var h=a.el;if(h&&a.template)h.innerHTML=a.template;else if(a.template)h=document.createElement("div"),h.innerHTML=a.template;else if("string"==m.type(h)){var i=h;if(h=document.querySelector(i),!h)return console.error("Can't not found element by selector \""+i+'"')}else if(!o.Element(h))throw new Error("Unmatch el option");this.$el=h,this.$methods={},this.$data=("function"==m.type(a.data)?a.data():a.data)||{},this.$refs={},m.objEach(a.methods,function(a,c){b.$methods[a]=b[a]=c.bind(b)}),d&&d.call(b),this.$compile(h),c&&c.call(b)}function e(a){function b(b){var e=a.data?a.data():{},f=m.extend({},a,b);"function"==m.type(f.data)&&(f.data=f.data()),f.methods=m.extend({},c,f.methods),f.data=m.extend({},e,f.data),d.call(this,f)}var c=a.methods;return b.prototype=d.prototype,b}function f(a,b,c,d,e){function f(b){return q(a,b,d)}function i(){var a=f(e);if(!a[0]&&m.diff(a[1],p)){var b=p;p=a[1],s&&s.call(j,a[1],b,{})}}var j=this,k=[],l=!!g(e);if(l&&(e=h(e)),c.multi){var n,o=/^[^:]+:/;if(!o.test(e))return console.error('Invalid expression of "{'+e+'}", it should be in this format: '+d+'="{ key: expression }".');e=e.replace(o,function(a){return n=a.replace(/:$/,"").trim(),""}).trim(),k.push(n)}j.$el=b,j.$vm=a,j.$id=t++;var p,r=c.bind,s=c.update;m.objEach(c,function(a,b){j[a]=b});var u;l?(p=f(e),u=p[0],p=p[1]):p=e,k.push(p),k.push(e),j.$update=i,r&&r.apply(j,k,e),!u&&s&&s.call(j,p)}function g(a){return a?!!a.trim().match(/^\{[\s\S]*?\}$/m):!1}function h(a){return a.trim().match(/^\{([\s\S]*)\}$/m)[1].replace(/^- /,"")}function i(a,b){if(!g(a))return{};var c=q(b,a.replace(new RegExp(n.directiveSep,"g"),","));return c[0]?{}:c[1]}function j(a,b){return a&&a.getAttribute(b)}function k(a,b){return a&&a.removeAttribute(b)}function l(a){var b=document.createElement("div"),c=document.createDocumentFragment();b.innerHTML=a;for(var d=b.childNodes;d.length;)c.appendChild(d[0]);return c}var m=c(1),n=c(2),o=c(3),p=c(4),q=c(6),r={},s={},t=0;d.prototype.$compile=function(a){"string"==m.type(a)&&(a=l(a));var b=n.namespace,c=this.$directives,d=this.$components,e=b+"component",g="["+e+"]",o=this,q=m.slice(a.querySelectorAll(g+" "+g)),t=m.slice(a.querySelectorAll(g));t.forEach(function(a){if(!a._component&&!~q.indexOf(a)){var c=j(a,e);if(!c)return console.error(e+" missing component id.");var f=r[c];if(!f)return console.error("Component '"+c+"' not found.");var g=j(a,b+"ref"),h=j(a,b+"data"),l=j(a,b+"methods"),n={},p={};k(a,e),["ref","data","methods"].forEach(function(c){k(a,b+c)}),h&&(n=i(h,this)),l&&(p=i(l,this)),a._component=e;var s=new f({el:a,data:n,methods:p});g&&(this.$refs[g]=s);var t=s.$update;s.$update=function(){h&&m.extend(s.$data,i(h,o)),t.apply(s,arguments)},d.push(s)}}.bind(this));var u=m.extend({},p,s);return Object.keys(u).forEach(function(d){var e=u[d];d=b+d;var g=m.slice(a.querySelectorAll("["+d+"]"));a.hasAttribute&&a.hasAttribute(d)&&g.unshift(a),g.forEach(function(a){var b=a._diretives||[],g=j(a,d)||"";if(!b||!~b.indexOf(d)){k(a,d);var i,l=n.directiveSep;e.multi&&g.match(l)?h(g).split(l).forEach(function(b){b.trim()&&(i=new f(o,a,e,d,"{"+b+"}"))}):i=new f(o,a,e,d,g),c.push(i),b.push(d),a._diretives=b}})}),a},d.create=function(a){return e(a)},d.component=function(a,b){var c=e(b);return r[a]=c,c},d.directive=function(a,b){s[a]=b},a.exports=d},function(a,b){"use strict";function c(a,b){return a&&a.hasOwnProperty(b)}var d={type:function(a){return/\[object (\w+)\]/.exec(Object.prototype.toString.call(a))[1].toLowerCase()},extend:function(a){if("object"!=this.type(a))return a;for(var b,c,d=1,e=arguments.length;e>d;d++){b=arguments[d];for(c in b)a[c]=b[c]}return a},objEach:function(a,b){if(a)for(var d in a)if(c(a,d)&&b(d,a[d])===!1)break},immutable:function(a){var b,c=this,d=this.type(a);return"array"==d?b=a.map(function(a){return c.immutable(a)}):"object"==d?(b={},this.objEach(a,function(a,d){b[a]=c.immutable(d)})):b=a,b},diff:function(a,b,c){var d=this;if(c=void 0==c?4:c,0>=c)return a!==b;if("array"==this.type(a)&&"array"==this.type(b))return a.length!==b.length?!0:a.some(function(a,e){return d.diff(a,b[e],c-1)});if("object"==this.type(a)&&"object"==this.type(b)){var e=Object.keys(a),f=Object.keys(b);if(e.length!=f.length)return!0;var d=this;return e.some(function(e){return!~f.indexOf(e)||d.diff(a[e],b[e],c-1)})}return a!==b},slice:function(a){return[].slice.call(a)}};a.exports=d},function(a,b){var c={namespace:"r-",directiveSep:";"};a.exports=c},function(a,b){"use strict";a.exports={Element:function(a){return a instanceof HTMLElement||a instanceof DocumentFragment},DOM:function(a){return this.Element(a)||a instanceof Comment}}},function(a,b,c){"use strict";var d=c(5),e=c(2),f=c(1);a.exports={attr:{multi:!0,bind:function(a){this.attname=a,this._$el=d(this.$el)},update:function(a){a||""===a?this._$el.attr(this.attname,a):this._$el.removeAttr(this.attname)}},"class":{multi:!0,bind:function(a){this.className=a,this._$el=d(this.$el)},update:function(a){a?this._$el.addClass(this.className):this._$el.removeClass(this.className)}},html:{update:function(a){this.$el.innerHTML=a}},on:{multi:!0,bind:function(a,b,c){this._expr=c,this.type=a},update:function(a){this.unbind();var b=a;return"function"!==f.type(b)?console.warn('"'+e.namespace+'on" only accept function. {'+this._expr+"}"):(this.fn=b.bind(this.$vm),void d(this.$el).on(this.type,this.fn,!1))},unbind:function(){this.fn&&(d(this.$el).off(this.type,this.fn),this.fn=null)}},show:{update:function(a){this.$el.style.display=a?"":"none"}},style:{multi:!0,bind:function(a){this.sheet=a},update:function(a){this.$el.style&&(this.$el.style[this.sheet]=a)}}}},function(a,b,c){"use strict";function d(a){if("string"==j.type(a))return e(j.copyArray(document.querySelectorAll(a)));if("array"==j.type(a))return e(a);if(a instanceof e)return a;if(k.DOM(a))return e(new f(a));throw new Error("Unexpect selector !")}function e(a){if(a instanceof e)return a;var b=new f;return a.forEach(function(a){b.push(a)}),b}function f(){this.push=function(){Array.prototype.push.apply(this,arguments)},this.forEach=function(){Array.prototype.forEach.apply(this,arguments)},this.push.apply(this,arguments)}function g(a){return a&&a.parentNode}function h(){return document.createDocumentFragment()}function i(a,b){return a.appendChild(b)}var j=c(1),k=c(3);f.prototype=Object.create(e.prototype);var l=e.prototype;l.find=function(a){var b=[];return this.forEach(function(c){b=b.concat(j.copyArray(c.querySelectorAll(a)))}),e(b)},l.attr=function(a,b){var c=arguments.length,d=this[0];if(c>1)d.setAttribute(a,b);else if(1==c)return(d.getAttribute(a)||"").toString();return this},l.removeAttr=function(a){return this.forEach(function(b){b.removeAttribute(a)}),this},l.addClass=function(a){return this.forEach(function(b){var c=b.className.split(" ");~c.indexOf(a)||c.push(a),b.className=c.join(" ")}),this},l.removeClass=function(a){return this.forEach(function(b){var c=b.className.split(" "),d=c.indexOf(a);~d&&c.splice(d,1),b.className=c.join(" ")}),this},l.hasClass=function(a){if(!this[0])return!1;var b=el.className.split(" ");return~~b.indexOf(a)},l.each=function(a){return this.forEach(a),this},l.on=function(a,b,c){return this.forEach(function(d){d.addEventListener(a,b,c)}),this},l.off=function(a,b){return this.forEach(function(c){c.removeEventListener(a,b)}),this},l.html=function(a){var b=arguments.length;if(b>=1)this.forEach(function(b){b.innerHTML=a});else if(this.length)return this[0].innerHTML;return this},l.parent=function(){return this.length?e([g(this[0])]):null},l.remove=function(){return this.forEach(function(a){var b=g(a);b&&b.removeChild(a)}),this},l.insertBefore=function(a){var b;return this.length?(1==this.length?b=this[0]:(b=h(),this.forEach(function(a){i(b,a)})),g(a).insertBefore(b,a),this):this},l.insertAfter=function(a){var b;return this.length?(1==this.length?b=this[0]:(b=h(),this.forEach(function(a){i(b,a)})),g(a).insertBefore(b,a.nextSibling),this):this},l.get=function(a){return this[a]},l.append=function(a){return this.length&&i(this[0],a),this},l.appendTo=function(a){if(1==this.length)i(a,this[0]);else if(this.length>1){var b=h();this.forEach(function(a){i(b,a)}),i(a,b)}},l.replace=function(a){var b=this[0];return g(b).replaceChild(a,b),this},a.exports=d},function(module,exports,__webpack_require__){function _execute($vm){var $scope=util.extend({},$vm.$methods,$vm.$data);try{return[null,util.immutable(eval("with($scope){(%s)}".replace("%s",arguments[1])))]}catch(e){switch(arguments[1]=". "+arguments[2]+"="+(/^\{/.test(arguments[1])?arguments[1]:"{"+arguments[1]+"}"),e.name){case"ReferenceError":console.warn(e.message+arguments[1]);break;default:console.error(arguments[2]?"'"+arguments[2]+"': ":"",e.message+arguments[1],arguments[3]||"")}return[e]}}var util=__webpack_require__(1);module.exports=_execute}])});
/*! Version 1.0.0 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2)

	module.exports = new Reve({
		el: '.home',
		ready: function () {
			console.log('Home')
		}
	})

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var tpl = __webpack_require__(3)
	console.log(tpl)
	module.exports = Reve.component('header', {
		template: tpl,
		data: function () {
			return {
				title: 'Header'
			}
		}
	})

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<div class=\"header\">\n\t<div class=\"title\" r-html=\"{title}\"></div>\n</div>";

/***/ }
/******/ ]);