
casper.test.begin( 'tests: filter', function( test ) {

	casper.start( 'tests/html/filter.html' )

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

		this.sendKeys( '#filter .filter', null, {reset: true} );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 0 );

		this.sendKeys( '#filter .filter', 'ABC' );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 1 );
	})

	.then( function() {
        test.comment( '> observing envent filtered' );

        test.assertSelectorHasText( 'p.eventCounter', '13' );
    })

	.run( function() { test.done(); });

});
