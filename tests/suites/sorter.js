
casper.test.begin( 'tests: sorter', function( test ) {

 	casper.start( 'tests/test.html' )

 	.run( function() { test.done(); });

});
