
function TableAble ( element, opts ) {
    this.element = element;
    var options = new Options();
    this.settings = $.extend( {}, options.getDefaults(), opts, options.getUneditableDefaults() );

    this.init();
}

TableAble.prototype.init = function () {
    var self           = this,
        shouldPaginate = ( self.settings.usePager  && self.settings.pagerListSelector.length   ),
        shouldFilter   = ( self.settings.useFilter && self.settings.filterInputSelector.length ),
        shouldSort     = ( self.settings.useSorter && ( $(self.element).find('thead').length ) )
    ;

    if ( shouldPaginate ) {
        self.pager  = new Pager ( self.element, self.settings );
        self.pager.setAfterPaginateCallback( function() { self.afterPaginate(); } );
    }

    if ( shouldFilter ) {
        self.filter = new Filter( self.element, self.settings );
        self.filter.setAfterFilterCallback( function(){ self.afterFilter( shouldPaginate ); } );
    }
    if ( shouldSort )   {
        self.sorter = new Sorter( self.element, self.settings );
        self.sorter.setAfterSortCallback( function(){ self.afterSort( shouldPaginate ); } );
    }

    if ( shouldPaginate ) { self.pager.paginate(); }


    $(self.element).on( 'refresh', function() {
        if ( shouldFilter ) {
            self.filter.triggerFilter();
        } else if ( shouldPaginate ) {
            self.pager.paginate();
        }
    });

};

TableAble.prototype.afterFilter = function( shouldPaginate ) {
    var self = this;
    if ( shouldPaginate ) {
        self.settings.currentPageIndex = '1';
        self.pager.paginate();
    }
    self.trigger( self.settings.filteredEvent );
};

TableAble.prototype.afterSort = function( shouldPaginate ) {
    var self = this;
    if ( shouldPaginate ) {
        if ( self.settings.jumpPageOneAfterSort ) {
            self.settings.currentPageIndex = '1';
        }
        self.pager.paginate();
    }
    self.trigger( self.settings.sortedEvent );
};

TableAble.prototype.afterPaginate = function() {
    var self = this;
    self.trigger( self.settings.pageChangedEvent, false );
};

TableAble.prototype.trigger = function( eventName, autoTriggerUpdate ) {
    var self = this,
        triggerUpdate = ( autoTriggerUpdate === undefined ) ? true : autoTriggerUpdate
    ;

    $( self.element ).trigger( eventName );

    if ( triggerUpdate ) { $( self.element ).trigger( self.settings.updatedEvent ); }
};

