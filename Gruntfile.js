'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        html2js: {
            main: {
                src: ['src/*.html'],
                dest: 'src/templates.js'
            }
        },
        karma: {
            unit: {
                options:{
                    configFile:'karma.conf.js'
                }
            }
        },
        serve: {
            options: {
                port: 9000
            }
        },
        // Linting js files, config settings in .jshintrc
        jshint: {
            all: ['src/*.js', '!src/templates.js', 'test/*.js', 'Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/angular-time-picker.min.js': ['src/angular-time-picker.js']
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'dist/angular-time-picker.min.css': ['src/angular-time-picker.css']
                }
            }
        },
        copy: {
            src: {
                files: [{
                    expand: true,
                    src: [ 'angular-time-picker.css', 'angular-time-picker.js' ],
                    cwd: 'src',
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        },
        clean: {
            before: [ 'dist' ]
        }
    });

    grunt.registerTask('local', [ 'html2js', 'jshint' ]);
    grunt.registerTask('minify', [ 'uglify', 'cssmin' ]);
    grunt.registerTask('build', [ 'clean:before', 'html2js', 'jshint', 'copy:src', 'minify' ]);
    grunt.registerTask('unit', [ 'html2js', 'karma:unit' ]);

    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
};
