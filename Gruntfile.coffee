module.exports = (grunt) ->
  grunt.initConfig
    urequire:
      _defaults:
        bundle:
          path: 'src'
          filez: [ 'common/**/*' ]
          name: 'Common bundle'
          webRootMap: '.'
          runtimeInfo: true
          dependencies: imports:
            ramda: 'R'
            'common/helpers': 'helpers'
            'common/_Error': '_Error'
        build:
          template: 'UMD'
          verbose: false
          debugLevel: 80
          clean: false

      target1:
        derive: [ '_defaults' ]
        bundle:
          filez: [ 'target1/**/*' ]
          name: 'Target1 bundle'
          dependencies: imports: 'target1/config': 'config'
        build: dstPath: 'build/target1'

  grunt.loadNpmTasks 'grunt-urequire'
  grunt.registerTask 'target1', [ 'urequire:target1' ]
  grunt.registerTask 'default', [ 'target1' ]
