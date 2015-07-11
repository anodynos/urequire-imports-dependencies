var defaultConfig = 'common/defaultConfig';

module.exports = helpers.deepMerge(defaultConfig, {
    foo: {
		bar: 'target1FooBar'
	}
});
