module.exports = function(grunt){

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'public/javascripts/*.js', 'spec/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

};
