var defaultConfig = require('common/defaultConfig');

module.exports = helpers.deepMerge(defaultConfig, {
    foo: {
		bar: 'target1FooBar'
	}
});
