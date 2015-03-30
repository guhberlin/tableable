
;(function ( $, window, document, undefined ) {

    'use strict';

    //willBeReplacedAutomatically

    $.fn.tableable = function ( options ) {
        this.each(function() {
            if ( !$.data( this, 'plugin_tableable' ) ) {
                $.data( this, 'plugin_tableable', new TableAble( this, options ) );
            }
        });

        return this;
    };

})( jQuery, window, document );
