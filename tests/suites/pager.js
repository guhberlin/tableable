
casper.test.begin( 'tests: pager', function( test ) {

	casper.start( 'tests/test.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#pager table tbody tr', 95 );

		test.assertElementCount( '#pager table tbody tr[data-page-index="1"]',  4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="2"]',  4 );
		test.assertElementCount( '#pager table tbody tr[data-page-index="24"]', 2 );

		test.assertElementCount( '#pager table tbody tr[data-page-index="1"][style*="table-row"]', 4 );
		test.assertElementCount( '#pager table tbody tr[style*="none"]', 91 );
	})

	.then( function() {
		test.comment( '> ul.pager' );

		test.assertElementCount( '#pager ul li', 9 );
		test.assertElementCount( '#pager ul li[class="active"]', 1 );

		test.assertElementCount( '#pager ul li[data-show-page-index="-1"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager ul li:first-child', 'data-show-page-index'), '-1' );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(2)', 'data-show-page-index'), '-1' );

		test.assertElementCount( '#pager ul li[data-show-page-index="2"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(8)', 'data-show-page-index'), '2' );

		test.assertElementCount( '#pager ul li[data-show-page-index="24"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(9)', 'data-show-page-index'), '24' );
	})

	.then( function() {
		test.comment( '> click next' );
		this.click( '#pager ul li:nth-child(8)' );

		test.comment( '>> check table' );
		test.assertElementCount( '#pager table tbody tr[data-page-index="2"][style*="table-row"]', 4 );

		test.comment( '>> check pager' );
		test.assertElementCount( '#pager ul li[class="active"]', 1 );
		test.assertElementCount( '#pager ul li[data-show-page-index="-1"]', 0 );
		test.assertElementCount( '#pager ul li[data-show-page-index="1"]', 3 );
		test.assertEquals( this.getElementAttribute('#pager ul li:first-child', 'data-show-page-index'), '1' );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(2)', 'data-show-page-index'), '1' );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(9)', 'data-show-page-index'), '3' );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(10)', 'data-show-page-index'), '24' );
	})

	.then( function() {
		test.comment( '> ul.pager switch to page 6' );
		this.click( '#pager ul li:nth-child(5)' );
		this.click( '#pager ul li:nth-child(6)' );
		this.click( '#pager ul li:nth-child(11)' );
		this.click( '#pager ul li:nth-child(12)' );

		test.assertElementCount( '#pager table tbody tr[data-page-index="6"][style*="table-row"]', 4 );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(7)', 'data-show-page-index'), '6' );
		test.assertEquals( this.getElementAttribute('#pager ul li:nth-child(7)', 'class'), 'active' );

		test.assertElementCount( '#pager ul li', 13 );
	})

	.then( function() {
		test.comment( '> ul.pager click last' );
		this.click( '#pager ul li:last-child' );

		test.comment( '>> check table' );
		test.assertElementCount( '#pager table tbody tr[data-page-index="24"][style*="table-row"]', 2 );

		test.comment( '>> check pager' );
		test.assertElementCount( '#pager ul li[data-show-page-index="-1"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager ul li[data-show-page-index="24"]', 'class'), 'active' );
	})

	.run( function() { test.done(); });

});
