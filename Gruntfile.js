module.exports = function(grunt) {
	grunt.initConfig({
		urequire: {
			_defaults: {
				bundle: {
					path: 'src',
					filez: ['common/**/*'],
					name: 'Common bundle',
					webRootMap: '.',
					runtimeInfo: true,
					dependencies: {
						imports: {
							"common/helpers": 'helpers',
							"common/_Error": '_Error'
						}
					}
				},
				build: {
					template: 'UMD',
					verbose: false,
					clean: false
				}
			},
			target1: {
				derive: ['_defaults'],
				bundle: {
					filez: ['target1/**/*'],
					name: 'Target1 bundle',
					dependencies: {
						imports: {
							"target1/config": 'config'
						}
					}
				},
				build: {
					dstPath: 'build/target1'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-urequire');

	grunt.registerTask('target1', [
		'urequire:target1'
	]);
	
	grunt.registerTask('all', [
		'urequire:target1'
	]);

};
