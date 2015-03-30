
function Sorter ( element, options, constants, cb ) {
    this.element   = element;
    this.settings  = options;
    this.constants = constants;
    this.afterSort = cb;

    var self = this;

    $( self.element )
        .children( self.constants.get('selector','thead') )
        .children( self.constants.get('selector','tr') )
        .children( self.constants.get('selector','th') )
        .each( function() {

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

        })
    ;

    var th = $(self.element).find( self.constants.get('selector','thead')+' '+self.constants.get('selector','tr')+' '+self.constants.get('selector','th')+':nth-child('+self.settings.initalSortColIndex+')' );
    if ( th && !Utils.Element( th ).hasAttr( self.settings.notSortableAttribute ) ) {
        self.sortRows( self.settings.initalSortColIndex );
    }
}

Sorter.prototype.sortRows = function( colIndex ) {
    var self = this,
        th = $( self.element ).children(self.constants.get('selector','thead')).children(self.constants.get('selector','tr')).find(':nth-child('+colIndex+')')
    ;

    var sortDirection = ( th.attr( self.settings.sortedAttribute ) !== 'ASC' ) ? 'ASC' : 'DESC';

    self['sort'+sortDirection]( colIndex );

    th.parent().children(self.constants.get('selector','th')).removeAttr( self.settings.sortedAttribute );
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
    var self = this;
    function getText(el) {
        return ($($(el).find( self.constants.get('selector','td') )[colIndex-1]).text());
    }
    return getText(b) < getText(a) ? 1 : -1;
};
Sorter.prototype.sortWithCallback = function( sortCallBack ) {
    var self = this;

    $( self.element ).children( self.constants.get('selector','tbody') ).append(
        ($( self.element ).children( self.constants.get('selector','tbody') ).children( self.constants.get('selector','tr') )).sort( sortCallBack )
    );
};
