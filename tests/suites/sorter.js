
casper.test.begin( 'tests: sorter', function( test ) {


 	casper.start( 'tests/html/sorter.html' )

    .then( function() {
        test.comment( '> table' );
    })
    .then( function() {
        test.comment( '> initial sort on column 1' );

        test.assertEquals( this.getElementAttribute('#sorter-table table thead tr th:first-child', 'data-sort-by'), 'ASC' );
        test.assertSelectorHasText( '#sorter-table table tbody tr:first-child td:first-child', 'abc' );
    })

    .then( function() {
        test.comment( '> first column sortable' );

        this.click( '#sorter-table table thead tr th:first-child' );
        test.assertEquals( this.getElementAttribute('#sorter-table table thead tr th:first-child', 'data-sort-by'), 'DESC' );
        test.assertSelectorHasText( '#sorter-table table tbody tr:first-child td:first-child', 'ghi' );

        this.click( '#sorter-table table thead tr th:first-child' );
        test.assertEquals( this.getElementAttribute('#sorter-table table thead tr th:first-child', 'data-sort-by'), 'ASC' );
        test.assertSelectorHasText( '#sorter-table table tbody tr:first-child td:first-child', 'abc' );
    })

    .then( function() {
        test.comment( '> second column not sortable' );

        this.click( '#sorter-table table thead tr th:last-child' );
        test.assertSelectorHasText( '#sorter-table table tbody tr td:last-child', '789' );
    })

    .then( function() {
        test.comment( '> observing envent sorted and updated' );

        test.assertSelectorHasText( '#sorter-table p.eventCounter', '2' );
        test.assertSelectorHasText( '#sorter-table p.updatedEventCounter', '2' );
    })


    .then( function() {
        test.comment( '> table-block' );
    })
    .then( function() {
        test.comment( '> initial sort on column 1' );

        test.assertEquals( this.getElementAttribute('#sorter-block .ta-table .ta-thead .ta-tr .ta-th:first-child', 'data-sort-by'), 'ASC' );
        test.assertSelectorHasText( '#sorter-block .ta-table .ta-tbody .ta-tr:first-child .ta-td:first-child', 'abc' );
    })

    .then( function() {
        test.comment( '> first column sortable' );

        this.click( '#sorter-block .ta-table .ta-thead .ta-tr .ta-th:first-child' );
        test.assertEquals( this.getElementAttribute('#sorter-block .ta-table .ta-thead .ta-tr .ta-th:first-child', 'data-sort-by'), 'DESC' );
        test.assertSelectorHasText( '#sorter-block .ta-table .ta-tbody .ta-tr:first-child .ta-td:first-child', 'ghi' );

        this.click( '#sorter-block .ta-table .ta-thead .ta-tr .ta-th:first-child' );
        test.assertEquals( this.getElementAttribute('#sorter-block .ta-table .ta-thead .ta-tr .ta-th:first-child', 'data-sort-by'), 'ASC' );
        test.assertSelectorHasText( '#sorter-block .ta-table .ta-tbody .ta-tr:first-child .ta-td:first-child', 'abc' );
    })

    .then( function() {
        test.comment( '> second column not sortable' );

        this.click( '#sorter-block .ta-table .ta-thead .ta-tr .ta-th:last-child' );
        test.assertSelectorHasText( '#sorter-block .ta-table .ta-tbody .ta-tr .ta-td:last-child', '789' );
    })

    .then( function() {
        test.comment( '> observing envent sorted and updated' );

        test.assertSelectorHasText( '#sorter-block p.eventCounter', '2' );
        test.assertSelectorHasText( '#sorter-block p.updatedEventCounter', '2' );
    })


 	.run( function() { test.done(); });

});
