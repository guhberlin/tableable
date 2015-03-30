
casper.test.begin( 'tests: filter', function( test ) {

	casper.start( 'tests/html/filter.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#filter-table table tbody tr', 4 );
		test.assertElementCount( '#filter-table table tbody tr[data-is-filtered]', 1 );
		test.assertNotVisible( '#filter-table table tbody tr[data-is-filtered]' );
		test.assertVisible( '#filter-table table tbody tr:not([data-is-filtered])' );
	})

	.then( function() {
		test.comment( '> input.filter' );

		this.sendKeys( '#filter-table .filter', 'abc' );
		test.assertElementCount( '#filter-table table tbody tr[data-is-filtered]', 2 );

		this.sendKeys( '#filter-table .filter', 'abcdef' );
		test.assertElementCount( '#filter-table table tbody tr[data-is-filtered]', 4 );
		test.assertElementCount( '#filter-table table tbody tr:not([data-is-filtered])', 0 );
		test.assertNotVisible( '#filter-table table tbody tr[data-is-filtered]' );

		this.sendKeys( '#filter-table .filter', null, {reset: true} );
		test.assertElementCount( '#filter-table table tbody tr[data-is-filtered]', 1 );

		this.sendKeys( '#filter-table .filter', 'ABC' );
		test.assertElementCount( '#filter-table table tbody tr[data-is-filtered]', 2 );
		test.assertNotVisible( '#filter-table table tbody tr[data-is-filtered]' );
		test.assertVisible( '#filter-table table tbody tr:not([data-is-filtered])' );
	})

	.then( function() {
        test.comment( '> observing event filtered and updated' );

        test.assertSelectorHasText( '#filter-table p.eventCounter', '13' );
        test.assertSelectorHasText( '#filter-table p.updatedEventCounter', '13' );
    })



	.then( function() {
        test.comment( '> table-block' );
        test.assertElementCount( '#filter-block .ta-table .ta-tbody .ta-tr', 4 );
        test.assertElementCount( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]', 1 );
        test.assertNotVisible( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]' );
        test.assertVisible( '#filter-block .ta-table .ta-tbody .ta-tr:not([data-is-filtered])' );
    })

    .then( function() {
        test.comment( '> input.filter' );

        this.sendKeys( '#filter-block .filter', 'abc' );
        test.assertElementCount( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]', 2 );

        this.sendKeys( '#filter-block .filter', 'abcdef' );
        test.assertElementCount( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]', 4 );
        test.assertElementCount( '#filter-block .ta-table .ta-tbody .ta-tr:not([data-is-filtered])', 0 );
        test.assertNotVisible( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]' );

        this.sendKeys( '#filter-block .filter', null, {reset: true} );
        test.assertElementCount( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]', 1 );

        this.sendKeys( '#filter-block .filter', 'ABC' );
        test.assertElementCount( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]', 2 );
        test.assertNotVisible( '#filter-block .ta-table .ta-tbody .ta-tr[data-is-filtered]' );
        test.assertVisible( '#filter-block .ta-table .ta-tbody .ta-tr:not([data-is-filtered])' );
    })

    .then( function() {
        test.comment( '> observing event filtered and updated' );

        test.assertSelectorHasText( '#filter-block p.eventCounter', '13' );
        test.assertSelectorHasText( '#filter-block p.updatedEventCounter', '13' );
    })


	.run( function() { test.done(); });

});
