module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: {
        email: 'EMAIL',
        password: 'PASSWORD',
        branch: 'default',
        ptr: false
      },
      dist: {
        src: ['src/*.js']
      }
    }
  });

  grunt.registerTask('default', ['screeps']);
};
