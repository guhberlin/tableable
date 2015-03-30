
casper.test.begin( 'tests: initial - filter', function( test ) {

	casper.start( 'tests/html/filter.html' )
	.then( function() { test.assertElementCount( '#filter-table', 1 ); })
    .then( function() { test.assertElementCount( '#filter-block', 1 ); })
  	.run( function() { test.done(); });

});

casper.test.begin( 'tests: initial - pager', function( test ) {

    casper.start( 'tests/html/pager.html' )
    .then( function() { test.assertElementCount( '#pager-table', 1 ); })
    .then( function() { test.assertElementCount( '#pager-block', 1 ); })
    .run( function() { test.done(); });

});

casper.test.begin( 'tests: initial - sorter', function( test ) {

    casper.start( 'tests/html/sorter.html' )
    .then( function() { test.assertElementCount( '#sorter-table', 1 ); })
    .then( function() { test.assertElementCount( '#sorter-block', 1 ); })
    .run( function() { test.done(); });

});
