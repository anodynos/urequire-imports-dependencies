// With urequire > 7.0.0.beta-30 `helpers.js` is no longer injected here just because its listed `dependencies.imports`
// we need to manually require it
// helpers = require('./helpers');

var _Error = function(name, msg) {
  this.name = name;
  this.message = msg;
  this.stack = (new Error()).stack;
}

helpers.inherits(_Error, Error);

_Error.prototype.toJSON = function() {
  return {name: this.name, message: this.message};
}

module.exports = _Error;
