
function Filter ( element, options ) {
    this.element = element;
    this.settings = options;
    this.afterFilter = function() {};

    var self = this;

    $( this.settings.filterInputSelector ).keyup( function() {
        self.filter( $(this).val() );
        self.afterFilter();
    });
}

Filter.prototype.setAfterFilterCallback = function( cb ) {
    var self = this;
    if ( $.isFunction( cb ) ) {
        self.afterFilter = cb;
    }
};

Filter.prototype.filter = function ( searched ) {
    var self = this,
        ignoredColumnIndices = []
    ;

    searched = ( self.settings.ignoreCase ) ? searched.toLowerCase() : searched ;

    $( self.element )
        .children( 'thead' )
        .children( 'tr' )
        .children( 'th['+self.settings.notFilterAttribute+']' )
        .each(function() { ignoredColumnIndices.push( $(this).index() ); })
    ;

    $( self.element )
        .children( 'tbody' )
        .children( 'tr' )
        .css( 'display', 'none' )
        .attr( self.settings.filteredAttribute, '' )
        .each( function() {
            var row = $(this);
            row.children( 'td' ).each( function(index, val) {
                if ( ignoredColumnIndices.indexOf( $(this).index() ) >= 0 || Utils.Element( this ).hasAttr( self.settings.notFilterAttribute ) ) { return; }

                val = ( self.settings.ignoreCase ) ? $(val).text().toLowerCase() : $(val).text() ;
                if ( val.indexOf( searched ) >= 0 ) {
                    row.css( 'display', self.settings.displayType ).removeAttr( self.settings.filteredAttribute );
                }
            });
        })
    ;

};

Filter.prototype.triggerFilter = function() {
    var self = this;

    self.filter( $(self.settings.filterInputSelector).val() );
    self.afterFilter();
};
