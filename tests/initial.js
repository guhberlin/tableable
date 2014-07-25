
casper.test.begin( 'tests: initial', function( test ) {

	casper.start( 'tests/test.html' )

	.then( function() {
		test.assertElementCount( '#filter', 1 );
		test.assertElementCount( '#pager', 1 );
		test.assertElementCount( '#sorter', 1 );
	})

  	.run( function() { test.done(); });

});
