
casper.test.begin( 'tests: pager', function( test ) {

	casper.start( 'tests/test.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#pager table tbody tr', 95 );

		test.assertElementCount( '#pager table tbody tr[data-page-index="1"]',  4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="2"]',  4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="24"]', 2 );

		test.assertElementCount( '#pager table tbody tr[style*="table-row"]', 4 );
		test.assertElementCount( '#pager table tbody tr[style*="none"]', 91 );
	})

	.then( function() {
		test.comment( '> ul.pager' );
		test.assertElementCount( '#pager ul li', 5 );
		test.assertElementCount( '#pager ul li[class="active"]', 1 );
	})

	.then( function() {
		test.comment( '> ul.pager switch to page 7' );
		this.click( '#pager ul li:nth-child(2)' );
		this.click( '#pager ul li:nth-child(3)' );
		this.click( '#pager ul li:nth-child(4)' );
		this.click( '#pager ul li:nth-child(5)' );
		this.click( '#pager ul li:nth-child(6)' );
		this.click( '#pager ul li:nth-child(6)' );

		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(5)', 'data-show-page-index'), '7' );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(5)', 'class'), 'active' );

		test.assertElementCount( '#pager ul li', 9 );
	})

	.then( function() {
		test.comment( '> ul.pager switch to last page' );
		this.click( '#pager ul li:last-child' );
		test.assertElementCount( '#pager table tbody tr[style*="table-row"]', 2 );
	})

	.run( function() { test.done(); });

});
