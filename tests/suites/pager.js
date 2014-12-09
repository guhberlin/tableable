
casper.test.begin( 'tests: pager', function( test ) {

	casper.start( 'tests/test.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#pager table tbody tr', 11 );

		test.assertElementCount( '#pager table tbody tr[data-page-index="1"]', 4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="2"]', 4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="3"]', 2 );

		test.assertElementCount( '#pager table tbody tr[style*="table-row"]', 4 );
		test.assertElementCount( '#pager table tbody tr[style*="none"]', 7 );
	})

	.then( function() {
		test.comment( '> ul.pager' );
		test.assertElementCount( '#pager ul li', 3 );
		test.assertElementCount( '#pager ul li[class="active"]', 1 );
	})

	.then( function() {
		test.comment( '> ul.pager switch to last page' );
		this.click( '#pager ul li:last-child' );
		test.assertElementCount( '#pager table tbody tr[style*="table-row"]', 2 );
	})

	.run( function() { test.done(); });

});
