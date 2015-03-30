
function Filter ( element, options, constants, cb ) {
    this.element     = element;
    this.settings    = options;
    this.constants   = constants;
    this.afterFilter = cb;

    var self = this;

    $( this.settings.filterInputSelector ).keyup( function() {
        self.filter();
    });

    self.filter();
}

Filter.prototype.filter = function() {
    var self = this,
        ignoredColumnIndices = [],
        searched = $(self.settings.filterInputSelector).val()
    ;

    searched = ( self.settings.ignoreCase ) ? searched.toLowerCase() : searched ;

    $( self.element )
        .children( self.constants.get('selector','thead') )
        .children( self.constants.get('selector','tr') )
        .children( self.constants.get('selector','th')+'['+self.settings.notFilterAttribute+']' )
        .each(function() { ignoredColumnIndices.push( $(this).index() ); })
    ;

    $( self.element )
        .children( self.constants.get('selector','tbody') )
        .children( self.constants.get('selector','tr') )
        .css( 'display', 'none' )
        .attr( self.settings.filteredAttribute, '' )
        .each( function() {
            var row = $(this);
            row.children( self.constants.get('selector','td') ).each( function(index, val) {
                if ( ignoredColumnIndices.indexOf( $(this).index() ) >= 0 ||
                     Utils.Element( this ).hasAttr( self.settings.notFilterAttribute ) ||
                     Utils.Element( row ).hasOneOfAttrs( self.settings.customFilteredAttributes ) )
                {
                    return;
                }

                val = ( self.settings.ignoreCase ) ? $(val).text().toLowerCase() : $(val).text() ;
                if ( val.indexOf( searched ) >= 0 ) {
                    row.css( 'display', self.constants.get('displayType','tr') ).removeAttr( self.settings.filteredAttribute );
                }
            });
        })
    ;

    self.afterFilter();
};
