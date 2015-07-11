var _Error = function(name, msg){
	this.name = name;
	this.message = msg;
	this.stack = (new Error()).stack;
}

helpers.inherits(_Error, Error);

_Error.prototype.toJSON = function(){
	return {name: this.name, message: this.message};
}

module.exports = _Error;
