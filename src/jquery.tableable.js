
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

	$.fn.hasOneOfAttrs = function( attributes ) {
		var el = this;
	    return ( attributes.filter( function(attribute) {
	        return $(el).hasAttr( attribute );
	    }).length > 0 );
	};

})( jQuery, window, document );
