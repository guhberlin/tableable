
casper.test.begin( 'tests: sorter', function( test ) {

 	casper.start( 'tests/test.html' )

    .then( function() {
        test.comment( '> first column sortable' );
        this.click( '#sorter table thead tr th:first-child' );
        test.assertSelectorHasText( '#sorter table tbody tr td:first-child', 'abc' );
        this.click( '#sorter table thead tr th:first-child' );
        test.assertSelectorHasText( '#sorter table tbody tr td:first-child', 'ghi' );
    })

    .then( function() {
        test.comment( '> second column not sortable' );
        this.click( '#sorter table thead tr th:last-child' );
        test.assertSelectorHasText( '#sorter table tbody tr td:last-child', '789' );
    })

 	.run( function() { test.done(); });

});
