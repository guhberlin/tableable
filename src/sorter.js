
function Sorter ( element, options ) {
    this.element = element;
    this.settings = options;
    this.afterSort = function() {};

    var self = this;

    $( self.element ).children('thead').children('tr').children('th').each( function() {

        if ( self.settings.notSortableAttribute.length &&
             $(this).hasAttr( self.settings.notSortableAttribute ) ) {
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

    if ( self.settings.notSortableAttribute.length ) {
        var th = $(self.element).find( 'thead tr th:nth-child('+self.settings.initalSortColIndex+')' );
        if ( th && !th.hasAttr( self.settings.notSortableAttribute ) ) {
            self.sortRows( self.settings.initalSortColIndex );
        }
    }

}

Sorter.prototype.setAfterSortCallback = function( cb ) {
    var self = this;
    if ( $.isFunction( cb ) ) {
        self.afterSort = cb;
    }
};

Sorter.prototype.sortRows = function( colIndex ) {
    var self = this,
        th = $( self.element ).children('thead').children('tr').find(':nth-child('+colIndex+')')
    ;

    if ( th.hasAttr( self.settings.sortedAttribute ) ) {
        if ( th.attr( self.settings.sortedAttribute ) === 'DESC' ) {
            self.sortAsc( colIndex );
            th.attr( self.settings.sortedAttribute, 'ASC' );
        } else {
            self.sortDesc( colIndex );
            th.attr( self.settings.sortedAttribute, 'DESC' );
        }
    } else {
        th.parent().children('th').each(function() {
            $(this).removeAttr( self.settings.sortedAttribute );
        });
        self.sortAsc( colIndex );
        th.attr( self.settings.sortedAttribute, 'ASC' );
    }

};
Sorter.prototype.sortWithCallback = function( sortCallBack ) {
    var self = this,
        rows = $( self.element ).children( 'tbody' ).children( 'tr' )
    ;

    if ( rows.length ) {

        $( self.element ).children( 'tbody' ).empty();
        rows = rows.sort( sortCallBack );
        $( self.element ).children( 'tbody' ).append( rows );

    }
};
Sorter.prototype.sortAsc = function( colIndex ) {
    var self = this;

    self.sortWithCallback( function(a,b) {
            return (
                ($(b).find(':nth-child('+colIndex+')').text()) < ($(a).find(':nth-child('+colIndex+')').text())
            );
        }
    );
};
Sorter.prototype.sortDesc = function( colIndex ) {
    var self = this;

    self.sortWithCallback( function(a,b) {
            return (
                ($(b).find(':nth-child('+colIndex+')').text()) > ($(a).find(':nth-child('+colIndex+')').text())
            );
        }
    );
};
