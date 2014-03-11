/*
 * grunt-ripple-emulator
 * https://github.com/jeff-french/grunt-ripple-emulator
 *
 * Copyright (c) 2013 Jeff French
 * Licensed under the MIT license.
 */

'use strict';
var ripple = require('ripple-emulator'),
    path = require('path'),
    open = require('open');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('ripple', 'Grunt task for the ripple emulator for Cordova/PhoneGap projects.', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
          remote: false,
          path: 'www',
          keepAlive: false,
          open: true,
          port: 4400
      });

      if( !options.remote ) {
        var paths = [];
        paths.push(options.path);
        options.path = paths;
        grunt.log.writeln('Using local path.');
      } else {
        grunt.log.writeln('Using remote location.');
      }

      delete options.path;

      var done = this.async();

      ripple.emulate.start(options);

      if(options.open){
          open('http://localhost:' + options.port + '?enableripple=cordova-3.0.0');
      }

      if(!options.keepAlive){
          done();
      } else {
          grunt.log.writeln('Waiting...');
          grunt.log.writeln('(Press Ctrl+C to exit)');
      }
  });

};
