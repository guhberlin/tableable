
function TableAble ( element, opts ) {
    this.element = element;

    this.initSettings( opts ).initFeatures();
}

TableAble.prototype.initSettings = function ( externalOptions ) {
    var self = this,
        options = new Options()
    ;

    self.settings = {};

    self.settings.shouldPaginate = ( externalOptions.pager  && externalOptions.pager.pagerListSelector.length ) ? true : false;
    self.settings.shouldFilter   = ( externalOptions.filter && externalOptions.filter.filterInputSelector.length ) ? true : false;
    self.settings.shouldSort     = ( externalOptions.sorter && ( $(self.element).find('thead').length ) ) ? true : false;

    self.settings = $.extend( true, self.settings, options.getDefaults(), externalOptions, options.getUneditableDefaults() );
    self.settings.pager.attrsToIgnoreRowOnPaging = [].concat(
        [self.settings.filter.filteredAttribute], self.settings.pager.customFilterAttributes
    );

    return self;
};

TableAble.prototype.initFeatures = function () {
    var self = this;

    if ( self.settings.shouldFilter ) {
        self.filter = new Filter( self.element, self.settings.filter );
        self.filter.setAfterFilterCallback( function() { self.afterFilter(); } );
    }
    if ( self.settings.shouldSort )   {
        self.sorter = new Sorter( self.element, self.settings.sorter );
        self.sorter.setAfterSortCallback( function() { self.afterSort(); } );
    }
    if ( self.settings.shouldPaginate ) {
        self.pager  = new Pager ( self.element, self.settings.pager );
        self.pager.setAfterPaginateCallback( function() { self.afterPaginate(); } );
        self.pager.paginate();
    }

    $(self.element).on( self.settings.events.refresh, function() {
        if ( self.settings.shouldFilter ) {
            self.filter.triggerFilter();
        } else if ( self.settings.shouldPaginate ) {
            self.pager.paginate();
        }
    });

    return self;
};

TableAble.prototype.afterFilter = function() {
    var self = this;

    self.trigger( self.settings.events.filtered, false );

    if ( self.settings.shouldPaginate ) {
        self.settings.pager.currentPageIndex = '1';
        self.pager.paginate();
    } else {
        self.trigger( self.settings.events.updated );
    }
};

TableAble.prototype.afterSort = function() {
    var self = this;

    self.trigger( self.settings.events.sorted, false );

    if ( self.settings.shouldPaginate ) {
        if ( self.settings.jumpPageOneAfterSort ) {
            self.settings.pager.currentPageIndex = '1';
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

