module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON( 'tableable.jquery.json' ),

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

		// Concat definitions
		concat: {
			dist: {
				src: [
						'src/filter.js',
						'src/sorter.js',
						'src/pager.js',
						'src/options.js',
						'src/tableable.js',
						'src/jquery.tableable.js'
					],
				dest: 'dist/jquery.tableable.js'
			},
			options: {
				banner: '<%= meta.banner %>'
			}
		},

		// Lint definitions
		jshint: {
			all: [
				'src/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

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
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-casper' );

	grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify', 'casper' ] );
	grunt.registerTask( 'test',    [ 'casper' ] );

};
