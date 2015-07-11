var helpers = {};

helpers.deepMerge = function(target, src, mergeArray){
	var replaceArray = mergeArray === false;
	var array = Array.isArray(src);
	var dst = array ? [] : {};
	if (array) {
		target = target || [];
		dst = dst.concat(target);
		if (replaceArray) {
			return dst;}
		src.forEach(function(e, i) {
			if (typeof dst[i] === 'undefined') {
				dst[i] = e;
			} else if (typeof e === 'object') {
				dst[i] = helpers.deepMerge(target[i], e, mergeArray);
			} else {
				if (target.indexOf(e) === -1) {
					dst.push(e);
				}
			}
		});
	}else{
		if(target && typeof target === 'object'){
			Object.keys(target).forEach(function(key){
				dst[key] = target[key]; });
		}else{
			target = {};
		}
		Object.keys(src).forEach(function (key) {
			if(typeof src[key] !== 'object' || src[key] === null){
				dst[key] = src[key];
			}else{ //src[key] is an object
				// Do not merge objects with custom prototype! (add option to merge anyway ?)
				if(src[key].constructor === Object && hasOwn.call(target, key)){
					dst[key] = helpers.deepMerge(target[key], src[key], mergeArray);
				}else{
					dst[key] = src[key];
				}
			}
		});
	}
	return dst;
}

if(typeof Object.create === 'function'){
	helpers.create = Object.create;
}else{
	helpers.create = (function (){
		var F = function () {};
		return function (o){
			if (arguments.length > 1){
				throw Error('Second argument not supported');}
			if (o === null){
				//throw Error('Cannot set a null [[Prototype]]');
				return helpers.create({});}
			if (typeof o !== 'object'){
				throw TypeError('Argument must be an object');}
			F.prototype = o;
			return new F();
		};
	})();
}

helpers.inherits = function(ctor, superCtor, copyKeys){
	ctor.super_ = superCtor;
	ctor.prototype = helpers.create(superCtor.prototype);
	ctor.prototype.constructor = ctor;
	if (copyKeys === true) {
		for (var key in superCtor) {
			if (hasOwn.call(superCtor, key)) {
				ctor[key] = superCtor[key];
			}
		}
	}
}

module.exports = helpers;
