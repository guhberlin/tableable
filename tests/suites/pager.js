
casper.test.begin( 'tests: pager', function( test ) {

	casper.start( 'tests/test.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#pager table tbody tr', 10 );

		test.assertElementCount( '#pager table tbody tr[data-page-index="1"]', 4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="2"]', 4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="3"]', 2 );

		test.assertElementCount( '#pager table tbody tr[style*="table-row"]', 4 );
		test.assertElementCount( '#pager table tbody tr[style*="none"]', 6 );
	})

	.then( function() {
		test.comment( '> ul.pager' );
		test.assertElementCount( '#pager ul li', 5 );
		test.assertElementCount( '#pager ul li[class="active"]', 1 );
	})

	.run( function() { test.done(); });

});
