# urequire-imports-dependencies
Demonstrates a bug with uRequire

The problem with imported dependencies is that they work perfectly when they are standalone (npm/bower package (local dep) or simple bundle dependency) but if they depend on other files unwanted circular dependencies appear.
The problem is that each imported module is injected in each other module (even other imported modules).

In this example, here is what happens:  

<img src="http://i.imgur.com/1bzTTTG.png" />

I think that this problem could be solved with one of those solutions :

1) Since imported modules with internal dependencies exists but are usually outnumbered by standard (non-globally imported) modules, I think that it wouldn't hurt to ask to explicitly require dependencies for these few modules. Imported modules wouldn't be injected in other imported modules unless there is an explicit `var helpers = require('helpers');`. It would lead to the following situation which resolves imported circular dependencies:

<img src="http://i.imgur.com/rPtRcx6.png" />

There is still a problem when an imported modules relies on a non-imported modules but its an edge case (`target1/config` with `common/defaultConfig`). To solve this, explicit requires should not only be forced on imported modules but also on their own dependencies.

2) An other solution is to allow to define settings for individual files (ie. imports on a per file level).
This is the solution I went with. I wrote a resource converter to whitelist/blacklist imports. It works for my case but there could be a better implementation:

````
[
	'+parameter-overrider',
	'Overrides global parameters for each file to remove circular dependencies.',
	['**/*.js'],
	function(m){
		var config = {
			'cmn/js/helpers/index': [true, '_'],
			'cmn/js/config': [true],
			'cmn/js/config.local': [true, 'helpers'],
			'webserver/config': [true, 'helpers'],
			'webserver/config.local': [true, 'helpers'],
			'webclient/js/config': [true, 'helpers'],
			'webclient/js/config.local': [true, 'helpers']
		};
		var rules = [];
		for(var key in config){
			if (key+'.js' === m.srcFilename) {
				rules = config[key];
				break;}}
		
		if (!rules.length) {
			return;
		}
		
		var whitelist = !!rules[0];
		
		if (whitelist) {
			var remove = [];
			for(var i=0, l=m.parameters.length; i<l; i++){
				var param = m.parameters[i];
				var idx = rules.indexOf(param);
				if (idx < 1) { // because rules[0] is boolean
					remove.push(param);}
			}
			rules = remove;
			rules.unshift(false);
			whitelist = false;
		}
		
		for(var i=1, l=rules.length; i<l; i++){
			var rule = rules[i];
			var idx = m.parameters.indexOf(rule);
			if (idx < 0) {
				continue; }
			m.parameters.splice(idx, 1);
			m.defineArrayDeps.splice(idx, 1);
		}
	}
]
````

