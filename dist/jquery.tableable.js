/*
 *  jQuery tableable plugin - v2.3.0
 *  A plugin to filter, paginate and sort html tables
 *  http://guhberlin.github.io/tableable
 *
 *  Made by guhberlin
 *  Under BSD-3-Clause License
 */

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
                if ( ignoredColumnIndices.indexOf( $(this).index() ) >= 0 || $(this).hasAttr( self.settings.notFilterAttribute ) ) { return; }

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

    var th = $(self.element).find( 'thead tr th:nth-child('+self.settings.initalSortColIndex+')' );
    if ( th && !th.hasAttr( self.settings.notSortableAttribute ) ) {
        self.sortRows( self.settings.initalSortColIndex );
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


function Pager ( element, options ) {
    this.element = element;
    this.settings = options;
    this.afterPaginate = function() {};

    this.settings.attrsToIgnoreRowOnPaging = [].concat(
        [this.settings.filteredAttribute], this.settings.customFilterAttributes
    );

    this.pagerListBuildFunction = ( this.settings.useDottedPager ) ? 'buildDottedPagerList' : 'buildFullPagerList' ;
}

Pager.prototype.setAfterPaginateCallback = function( cb ) {
    var self = this;
    if ( $.isFunction( cb ) ) {
        self.afterPaginate = cb;
    }
};

Pager.prototype.paginate = function () {
    var self = this,
        pageCount = 0
    ;

    $( self.element )
        .children( 'tbody' )
        .children( 'tr' )
        .removeAttr( self.settings.pageIndexAttribute )
        .filter( function() {
            return ( !$(this).hasOneOfAttrs( self.settings.attrsToIgnoreRowOnPaging ) );
        })
        .each( function(index) {
            if ( (index%self.settings.rowsPerPage) === 0 ) { pageCount++; }
            $(this).attr( self.settings.pageIndexAttribute, pageCount );
        })
    ;

    self.showPage( self.settings.currentPageIndex );
};

Pager.prototype.getPageCount = function() {
    var self = this;

    return Math.ceil( $( self.element )
        .children( 'tbody' )
        .children( 'tr' )
        .filter( function() {
            return ( !$(this).hasOneOfAttrs( self.settings.attrsToIgnoreRowOnPaging ) );
        })
        .length / self.settings.rowsPerPage
    );
};

Pager.prototype.buildPagerList = function () {
    var self = this;

    $( self.settings.pagerListSelector ).empty();

    self[self.pagerListBuildFunction]();

    $( self.settings.pagerListSelector +' li['+self.settings.showPageIndexAttribute+']' ).on('click', function() {
        self.showPage( $(this).attr( self.settings.showPageIndexAttribute ) );
    });
};

Pager.prototype.buildFullPagerList = function() {
    var self      = this,
        pageCount = self.getPageCount()
    ;

    for ( var i=1; i <= pageCount; i++ ) {
        $( self.settings.pagerListSelector ).append('<li '+self.settings.showPageIndexAttribute+'="'+i+'"><a>'+i+'</a></li>');
    }

};

Pager.prototype.buildDottedPagerList = function() {
    var self      = this,
        cpi       = parseInt( self.settings.currentPageIndex ),
        nospse    = parseInt( self.settings.noOfShownPagesStartEnd ),
        nospntcp  = parseInt( self.settings.noOfShownPagesNextToCurrentPage ),
        pageCount = self.getPageCount(),
        drawDots  = false
    ;

    for ( var i=1; i <= pageCount; i++ ) {
        if (
            (i <= nospse) ||
            (i >= cpi - nospntcp && i <= cpi + nospntcp ) ||
            (i > pageCount - nospse)
        ){
            $( self.settings.pagerListSelector ).append('<li '+self.settings.showPageIndexAttribute+'="'+i+'"><a>'+i+'</a></li>');
            drawDots = true;
        } else {
            if ( drawDots ) {
                $( self.settings.pagerListSelector ).append('<li><a>...</a></li>');
                drawDots = false;
            }
        }
    }
};

Pager.prototype.showPage = function ( pageIndex ) {
    var self = this;
    $( self.element )
        .children( 'tbody' )
        .children( 'tr' )
        .css( 'display', 'none' )
        .filter( 'tr['+self.settings.pageIndexAttribute+'="'+pageIndex+'"]' )
        .css( 'display', self.settings.displayType )
    ;

    self.settings.currentPageIndex = pageIndex;
    self.buildPagerList();

    $( self.settings.pagerListSelector +' li' ).removeClass( 'active' );
    $( self.settings.pagerListSelector +' li['+self.settings.showPageIndexAttribute+'="'+pageIndex+'"]' ).addClass( 'active' );

    self.afterPaginate();
};





function Options() {}

Options.prototype.getDefaults = function() {
    return {
        useFilter: true,
        filterInputSelector: '',
        ignoreCase: false,
        notFilterAttribute: 'data-no-filter',
        customFilterAttributes: [],

        usePager: true,
        useDottedPager: true,
        pagerListSelector: '',
        rowsPerPage: 5,
        noOfShownPagesStartEnd: 2,
        noOfShownPagesNextToCurrentPage: 1,

        useSorter: true,
        sortTriggerSelector: '',
        jumpPageOneAfterSort: true,
        notSortableAttribute: 'data-no-sort',

        initalSortColIndex: -1,
    };
};

Options.prototype.getUneditableDefaults = function() {
    return {
        displayType:             'table-row',
        updatedEvent:            'updated',

        filteredAttribute:       'data-is-filtered',
        filteredEvent:           'filtered',

        pageIndexAttribute:      'data-page-index',
        showPageIndexAttribute:  'data-show-page-index',
        currentPageIndex:        '1',
        pagedEvent:              'paged',
        pageChangedEvent:        'pageChanged',

        sortedAttribute:         'data-sort-by',
        sortedEvent:             'sorted',
    };
};


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
