
casper.test.begin( 'tests: initial', function( test ) {

	casper.start( 'demo/index.html' )

	.then( function() {
		test.assertElementCount( 'table tbody tr', 10 );
	})

  	.run( function() { test.done(); });

});
