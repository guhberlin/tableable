
;(function ( $, window, document, undefined ) {

	'use strict';

	$.fn.tableable = function ( options ) {
		this.each(function() {
			if ( !$.data( this, 'plugin_tableable' ) ) {
				$.data( this, 'plugin_tableable', new TableAble( this, options ) );
			}
		});

		return this;
	};

	$.fn.hasAttr = function( name ) {
   		return ( name !== undefined ) ? (this.attr( name ) !== undefined) : false ;
	};

})( jQuery, window, document );
