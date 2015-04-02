module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON( 'package.json' ),

		// Banner definitions
		meta: {
			banner: '/*\n' +
				' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
				' *  <%= pkg.description %>\n' +
				' *  <%= pkg.homepage %>\n' +
				' *\n' +
				' *  Made by <%= pkg.author.name %>\n' +
				' *  Under <%= pkg.licenses[0].type %> License\n' +
				' */\n'
		},

		// copies
		copy: {

			//
		    json: {
		        src: 'package.json',
		        dest: 'tableable.jquery.json',
		    },

		    // src to dist
		    src: {
		        src: 'src/jquery.tableable.js',
		        dest: 'dist/jquery.tableable.js',
		        options: {
		            process: function(content, srcpath) {
		                var src = '';
		                var sourceFiles = [
		                    'src/utils.js',
		                    'src/filter.js',
		                    'src/sorter.js',
		                    'src/pager.js',
		                    'src/options.js',
		                    'src/constants.js',
		                    'src/tableable.js',
		                ];
		                sourceFiles.forEach(function(f) { src += grunt.file.read(f); });
		                var regex = new RegExp('\/\/willBeReplacedAutomatically', 'g');
		                return content.replace(regex, '' + src + '');
		            },
		        },
		    },
		},
		// add banner to copy
		concat: {
			dist: {
				src: [ 'dist/jquery.tableable.js' ],
				dest: 'dist/jquery.tableable.js'
			},
			options: {
				banner: '<%= meta.banner %>'
			}
		},

		// Lint definitions
		jshint: {
			all: [ 'src/*.js' ],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// test
		casper: {
			main: {
				options: {
					test: true,
					pre: 'tests/initial.js',
				},
				files: {
					'tests/logs/testlog.<%= grunt.template.today("yyyymmddHHMMss") %>.xml': [ 'tests/suites/' ],
				},
			},
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: [ 'dist/jquery.tableable.js' ],
				dest: 'dist/jquery.tableable.min.js'
			},
			options: {
				banner: '<%= meta.banner %>'
			}
		},

		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		},

	});

	grunt.loadNpmTasks( 'grunt-contrib-copy'   );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-casper' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'default', [ 'jshint', 'copy:json', 'copy:src', 'concat', 'uglify', 'casper' ] );
	grunt.registerTask( 'test',    [ 'casper' ] );
	grunt.registerTask( 'lint',    [ 'jshint' ] );
	grunt.registerTask( 'build',   [ 'copy:src' ] );

};
