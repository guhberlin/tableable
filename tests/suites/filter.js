
casper.test.begin( 'tests: filter', function( test ) {

	casper.start( 'tests/test.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#filter table tbody tr', 3 );
	})

	.then( function() {
		test.comment( '> input.filter' );
		this.sendKeys( '#filter .filter', 'abc' );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 1 );
		this.sendKeys( '#filter .filter', 'abcdef' );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 3 );
	})

	.run( function() { test.done(); });

});
