
casper.test.begin( 'tests: initial - filter', function( test ) {

	casper.start( 'tests/html/filter.html' )
	.then( function() { test.assertElementCount( '#filter', 1 ); })
  	.run( function() { test.done(); });

});

casper.test.begin( 'tests: initial - pager', function( test ) {

    casper.start( 'tests/html/pager.html' )
    .then( function() { test.assertElementCount( '#pager', 1 ); })
    .run( function() { test.done(); });

});

casper.test.begin( 'tests: initial - sorter', function( test ) {

    casper.start( 'tests/html/sorter.html' )
    .then( function() { test.assertElementCount( '#sorter', 1 ); })
    .run( function() { test.done(); });

});
