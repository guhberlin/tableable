
function Sorter ( element, options, cb ) {
    this.element   = element;
    this.settings  = options;
    this.afterSort = cb;

    var self = this;

    $( self.element ).children('thead').children('tr').children('th').each( function() {

        if ( self.settings.notSortableAttribute.length &&
             Utils.Element( this ).hasAttr( self.settings.notSortableAttribute ) ) {
            return;
        }

        var thIndex = $(this).index()+1,
            trigger = ( self.settings.sortTriggerSelector.length ) ? $(this).find( self.settings.sortTriggerSelector ) : $(this)
        ;

        trigger.on('click', function() {
            self.sortRows( thIndex );
            self.afterSort();
        });

    });

    var th = $(self.element).find( 'thead tr th:nth-child('+self.settings.initalSortColIndex+')' );
    if ( th && !Utils.Element( th ).hasAttr( self.settings.notSortableAttribute ) ) {
        self.sortRows( self.settings.initalSortColIndex );
    }
}

Sorter.prototype.sortRows = function( colIndex ) {
    var self = this,
        th = $( self.element ).children('thead').children('tr').find(':nth-child('+colIndex+')')
    ;

    var sortDirection = ( th.attr( self.settings.sortedAttribute ) !== 'ASC' ) ? 'ASC' : 'DESC';

    self['sort'+sortDirection]( colIndex );

    th.parent().children('th').removeAttr( self.settings.sortedAttribute );
    th.attr( self.settings.sortedAttribute, sortDirection );
};
Sorter.prototype.sortASC = function( colIndex ) {
    var self = this;

    self.sortWithCallback( function(a,b) {
        return self.sortCallback( a, b, colIndex );
    });
};
Sorter.prototype.sortDESC = function( colIndex ) {
    var self = this;

    self.sortWithCallback( function(a,b) {
        return self.sortCallback( b, a, colIndex );
    });
};
Sorter.prototype.sortCallback = function( a, b, colIndex ) {
    return ($(b).find(':nth-child('+colIndex+')').text()) < ($(a).find(':nth-child('+colIndex+')').text()) ? 1 : -1;
};
Sorter.prototype.sortWithCallback = function( sortCallBack ) {
    var self = this;

    $( self.element ).children( 'tbody' ).append(
        ($( self.element ).children( 'tbody' ).children( 'tr' )).sort( sortCallBack )
    );
};
