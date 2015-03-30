
casper.test.begin( 'tests: pager', function( test ) {

	casper.start( 'tests/html/pager.html' )

	.then( function() {
		test.comment( '> table' );
		test.assertElementCount( '#pager-table table tbody tr', 95 );

		test.assertElementCount( '#pager-table table tbody tr[data-page-index="1"]',  4 );
		test.assertElementCount( '#pager-table table tbody tr[data-page-index="2"]',  4 );
		test.assertElementCount( '#pager-table table tbody tr[data-page-index="24"]', 2 );

		test.assertElementCount( '#pager-table table tbody tr[data-page-index="1"][style*="table-row"]', 4 );
		test.assertElementCount( '#pager-table table tbody tr[style*="none"]', 91 );
	})

	.then( function() {
		test.comment( '> ul.pager' );

		test.assertElementCount( '#pager-table ul li', 9 );
		test.assertElementCount( '#pager-table ul li[class="active"]', 1 );

		test.assertElementCount( '#pager-table ul li[data-show-page-index="-1"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:first-child', 'data-show-page-index'), '-1' );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(2)', 'data-show-page-index'), '-1' );

		test.assertElementCount( '#pager-table ul li[data-show-page-index="2"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(8)', 'data-show-page-index'), '2' );

		test.assertElementCount( '#pager-table ul li[data-show-page-index="24"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(9)', 'data-show-page-index'), '24' );
	})

	.then( function() {
		test.comment( '> click next' );
		this.click( '#pager-table ul li:nth-child(8)' );

		test.comment( '>> check table' );
		test.assertElementCount( '#pager-table table tbody tr[data-page-index="2"][style*="table-row"]', 4 );

		test.comment( '>> check pager' );
		test.assertElementCount( '#pager-table ul li[class="active"]', 1 );
		test.assertElementCount( '#pager-table ul li[data-show-page-index="-1"]', 0 );
		test.assertElementCount( '#pager-table ul li[data-show-page-index="1"]', 3 );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:first-child', 'data-show-page-index'), '1' );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(2)', 'data-show-page-index'), '1' );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(9)', 'data-show-page-index'), '3' );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(10)', 'data-show-page-index'), '24' );
	})

	.then( function() {
		test.comment( '> ul.pager switch to page 6' );
		this.click( '#pager-table ul li:nth-child(5)' );
		this.click( '#pager-table ul li:nth-child(6)' );
		this.click( '#pager-table ul li:nth-child(11)' );
		this.click( '#pager-table ul li:nth-child(12)' );

		test.assertElementCount( '#pager-table table tbody tr[data-page-index="6"][style*="table-row"]', 4 );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(7)', 'data-show-page-index'), '6' );
		test.assertEquals( this.getElementAttribute('#pager-table ul li:nth-child(7)', 'class'), 'active' );

		test.assertElementCount( '#pager-table ul li', 13 );
	})

	.then( function() {
		test.comment( '> ul.pager click last' );
		this.click( '#pager-table ul li:last-child' );

		test.comment( '>> check table' );
		test.assertElementCount( '#pager-table table tbody tr[data-page-index="24"][style*="table-row"]', 2 );

		test.comment( '>> check pager' );
		test.assertElementCount( '#pager-table ul li[data-show-page-index="-1"]', 2 );
		test.assertEquals( this.getElementAttribute('#pager-table ul li[data-show-page-index="24"]', 'class'), 'active' );
	})

	.then( function() {
        test.comment( '> observing event paged and updated' );

        test.assertSelectorHasText( '#pager-table p.eventCounter', '6' );
        test.assertSelectorHasText( '#pager-table p.updatedEventCounter', '6' );
    })



	.then( function() {
        test.comment( '> table-block' );
        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr', 95 );

        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[data-page-index="1"]',  4 );
        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[data-page-index="2"]',  4 );
        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[data-page-index="24"]', 2 );

        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[data-page-index="1"][style*="block"]', 4 );
        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[style*="none"]', 91 );
    })

    .then( function() {
        test.comment( '> ul.pager' );

        test.assertElementCount( '#pager-block ul li', 9 );
        test.assertElementCount( '#pager-block ul li[class="active"]', 1 );

        test.assertElementCount( '#pager-block ul li[data-show-page-index="-1"]', 2 );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:first-child', 'data-show-page-index'), '-1' );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(2)', 'data-show-page-index'), '-1' );

        test.assertElementCount( '#pager-block ul li[data-show-page-index="2"]', 2 );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(8)', 'data-show-page-index'), '2' );

        test.assertElementCount( '#pager-block ul li[data-show-page-index="24"]', 2 );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(9)', 'data-show-page-index'), '24' );
    })

    .then( function() {
        test.comment( '> click next' );
        this.click( '#pager-block ul li:nth-child(8)' );

        test.comment( '>> check table' );
        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[data-page-index="2"][style*="block"]', 4 );

        test.comment( '>> check pager' );
        test.assertElementCount( '#pager-block ul li[class="active"]', 1 );
        test.assertElementCount( '#pager-block ul li[data-show-page-index="-1"]', 0 );
        test.assertElementCount( '#pager-block ul li[data-show-page-index="1"]', 3 );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:first-child', 'data-show-page-index'), '1' );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(2)', 'data-show-page-index'), '1' );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(9)', 'data-show-page-index'), '3' );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(10)', 'data-show-page-index'), '24' );
    })

    .then( function() {
        test.comment( '> ul.pager switch to page 6' );
        this.click( '#pager-block ul li:nth-child(5)' );
        this.click( '#pager-block ul li:nth-child(6)' );
        this.click( '#pager-block ul li:nth-child(11)' );
        this.click( '#pager-block ul li:nth-child(12)' );

        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[data-page-index="6"][style*="block"]', 4 );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(7)', 'data-show-page-index'), '6' );
        test.assertEquals( this.getElementAttribute('#pager-block ul li:nth-child(7)', 'class'), 'active' );

        test.assertElementCount( '#pager-block ul li', 13 );
    })

    .then( function() {
        test.comment( '> ul.pager click last' );
        this.click( '#pager-block ul li:last-child' );

        test.comment( '>> check table' );
        test.assertElementCount( '#pager-block .ta-table .ta-tbody .ta-tr[data-page-index="24"][style*="block"]', 2 );

        test.comment( '>> check pager' );
        test.assertElementCount( '#pager-block ul li[data-show-page-index="-1"]', 2 );
        test.assertEquals( this.getElementAttribute('#pager-block ul li[data-show-page-index="24"]', 'class'), 'active' );
    })

    .then( function() {
        test.comment( '> observing event paged and updated' );

        test.assertSelectorHasText( '#pager-block p.eventCounter', '6' );
        test.assertSelectorHasText( '#pager-block p.updatedEventCounter', '6' );
    })


    .then( function() {
    	test.comment( '> paging empty table' );

    	test.assertElementCount( '#emptyPager ul li', 4 );
    	test.assertElementCount( '#emptyPager ul li[data-show-page-index="-1"]', 4 );
    })

	.run( function() { test.done(); });

});
