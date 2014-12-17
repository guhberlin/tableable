
casper.test.begin( 'tests: filter', function( test ) {

	casper.start( 'tests/html/filter.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#filter table tbody tr', 4 );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 1 );
		test.assertNotVisible( '#filter table tbody tr[data-is-filtered]' );
		test.assertVisible( '#filter table tbody tr:not([data-is-filtered])' );
	})

	.then( function() {
		test.comment( '> input.filter' );

		this.sendKeys( '#filter .filter', 'abc' );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 2 );

		this.sendKeys( '#filter .filter', 'abcdef' );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 4 );
		test.assertElementCount( '#filter table tbody tr:not([data-is-filtered])', 0 );
		test.assertNotVisible( '#filter table tbody tr[data-is-filtered]' );

		this.sendKeys( '#filter .filter', null, {reset: true} );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 1 );

		this.sendKeys( '#filter .filter', 'ABC' );
		test.assertElementCount( '#filter table tbody tr[data-is-filtered]', 2 );
		test.assertNotVisible( '#filter table tbody tr[data-is-filtered]' );
		test.assertVisible( '#filter table tbody tr:not([data-is-filtered])' );
	})

	.then( function() {
        test.comment( '> observing envent filtered and updated' );

        test.assertSelectorHasText( 'p.eventCounter', '13' );
        test.assertSelectorHasText( 'p.updatedEventCounter', '13' );
    })

	.run( function() { test.done(); });

});
