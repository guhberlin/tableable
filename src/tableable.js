
function TableAble ( element, opts ) {
    this.element = element;
    var options = new Options();

    this.settings = $.extend( true, {}, options.getDefaults(), opts, options.getUneditableDefaults() );
    this.settings.pager.attrsToIgnoreRowOnPaging = [].concat(
        [this.settings.filter.filteredAttribute], this.settings.pager.customFilterAttributes
    );

    this.init();
}

TableAble.prototype.init = function () {
    var self           = this,
        shouldPaginate = ( self.settings.pager  && self.settings.pager.pagerListSelector.length   ),
        shouldFilter   = ( self.settings.filter && self.settings.filter.filterInputSelector.length ),
        shouldSort     = ( self.settings.sorter && ( $(self.element).find('thead').length ) )
    ;

    if ( shouldPaginate ) {
        self.pager  = new Pager ( self.element, self.settings.pager );
        self.pager.setAfterPaginateCallback( function() { self.afterPaginate(); } );
    }

    if ( shouldFilter ) {
        self.filter = new Filter( self.element, self.settings.filter );
        self.filter.setAfterFilterCallback( function(){ self.afterFilter( shouldPaginate ); } );
    }
    if ( shouldSort )   {
        self.sorter = new Sorter( self.element, self.settings.sorter );
        self.sorter.setAfterSortCallback( function(){ self.afterSort( shouldPaginate ); } );
    }

    if ( shouldPaginate ) { self.pager.paginate(); }


    $(self.element).on( self.settings.events.refresh, function() {
        if ( shouldFilter ) {
            self.filter.triggerFilter();
        } else if ( shouldPaginate ) {
            self.pager.paginate();
        }
    });

};

TableAble.prototype.afterFilter = function( shouldPaginate ) {
    var self = this;

    self.trigger( self.settings.events.filtered, false );

    if ( shouldPaginate ) {
        self.settings.currentPageIndex = '1';
        self.pager.paginate();
    } else {
        self.trigger( self.settings.events.updated );
    }
};

TableAble.prototype.afterSort = function( shouldPaginate ) {
    var self = this;

    self.trigger( self.settings.events.sorted, false );

    if ( shouldPaginate ) {
        if ( self.settings.jumpPageOneAfterSort ) {
            self.settings.currentPageIndex = '1';
        }
        self.pager.paginate();
    } else {
        self.trigger( self.settings.events.updated );
    }
};

TableAble.prototype.afterPaginate = function() {
    var self = this;
    self.trigger( self.settings.events.paged );
};

TableAble.prototype.trigger = function( eventName, autoTriggerUpdate ) {
    var self = this,
        triggerUpdate = ( autoTriggerUpdate === undefined ) ? true : autoTriggerUpdate
    ;

    $( self.element ).trigger( eventName );

    if ( triggerUpdate ) { $( self.element ).trigger( self.settings.events.updated ); }
};

