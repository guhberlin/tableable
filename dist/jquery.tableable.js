/*
 *  jQuery tableable plugin - v2.4.3
 *  A plugin to filter, paginate and sort html tables
 *  http://guhberlin.github.io/tableable
 *
 *  Made by guhberlin
 *  Under BSD-3-Clause License
 */

function Utils() {}


Utils.Element = function( el ) {
    var self = this.Element.prototype;
    self.el = $(el);

    return self;
};

Utils.Element.prototype.hasAttr = function( name ) {
    return ( name !== undefined ) ? ($(this.el).attr( name ) !== undefined) : false ;
};
Utils.Element.prototype.hasOneOfAttrs = function( attributes ) {
    var self = this;
    return ( attributes.filter( function(attribute) {
        return self.hasAttr( attribute );
    }).length > 0 );
};


function Filter ( element, options, cb ) {
    this.element     = element;
    this.settings    = options;
    this.afterFilter = cb;

    var self = this;

    $( this.settings.filterInputSelector ).keyup( function() {
        self.filter();
    });
}

Filter.prototype.filter = function() {
    var self = this,
        ignoredColumnIndices = [],
        searched = $(self.settings.filterInputSelector).val()
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

    self.afterFilter();
};


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


function Pager ( element, options, cb ) {
    this.element       = element;
    this.settings      = options;
    this.afterPaginate = cb;

    this.pagerListBuildFunction = ( this.settings.useDottedPager ) ? 'buildDottedPagerList' : 'buildFullPagerList' ;
}

Pager.prototype.paginate = function () {
    var self = this,
        pageCount = 0
    ;

    $( self.element )
        .children( 'tbody' )
        .children( 'tr' )
        .removeAttr( self.settings.pageIndexAttribute )
        .filter( function() {
            return ( !Utils.Element( this ).hasOneOfAttrs( self.settings.attrsToIgnoreRowOnPaging ) );
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
            return ( !Utils.Element( this ).hasOneOfAttrs( self.settings.attrsToIgnoreRowOnPaging ) );
        })
        .length / self.settings.rowsPerPage
    );
};

Pager.prototype.buildPagerList = function () {
    var self      = this,
        cpi       = parseInt( self.settings.currentPageIndex ),
        pageCount = self.getPageCount()
    ;

    $( self.settings.pagerListSelector ).empty();


    // first + prev
    if( self.settings.firstLable.length > 0 ) {
        self.appendPagerItem( self.settings.firstLable, (cpi !== 1 ? 1 : self.settings.inactivPagerIndex) );
    }
    if( self.settings.prevLable.length > 0 ) {
        self.appendPagerItem( self.settings.prevLable, (cpi !== 1 ? cpi-1 : self.settings.inactivPagerIndex) );
    }

    self[self.pagerListBuildFunction]();

    // next + last
    if( self.settings.nextLable.length > 0 ) {
        self.appendPagerItem( self.settings.nextLable, (cpi !== pageCount ? cpi+1 : self.settings.inactivPagerIndex) );
    }
    if( self.settings.lastLable.length > 0 ) {
        self.appendPagerItem( self.settings.lastLable, (cpi !== pageCount ? pageCount : self.settings.inactivPagerIndex) );
    }


    $( self.settings.pagerListSelector +' li['+self.settings.showPageIndexAttribute+']' ).on('click', function() {
        self.showPage( $(this).attr( self.settings.showPageIndexAttribute ) );
    });
};

Pager.prototype.buildFullPagerList = function() {
    var self      = this,
        pageCount = self.getPageCount()
    ;

    for ( var i=1; i <= pageCount; i++ ) { self.appendPagerItem(i, i); }
};

Pager.prototype.buildDottedPagerList = function() {
    var self      = this,
        cpi       = parseInt( self.settings.currentPageIndex ),
        nospse    = parseInt( self.settings.noOfShownPagesStartEnd ),
        nospntcp  = parseInt( self.settings.noOfShownPagesNextToCurrentPage ),
        pageCount = self.getPageCount(),
        drawDots  = true
    ;

    for ( var i=1; i <= pageCount; i++ ) {
        if (
            (i <= nospse) ||
            (i >= cpi - nospntcp && i <= cpi + nospntcp ) ||
            (i > pageCount - nospse)
        ){
            self.appendPagerItem(i, i);
            drawDots = true;
        } else {
            if ( drawDots ) {
                self.appendPagerItem( '...' );
                drawDots = false;
            }
        }
    }
};

Pager.prototype.showPage = function ( pageIndex ) {
    var self = this;
    if ( pageIndex === self.settings.inactivPagerIndex ) { return; }

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

Pager.prototype.appendPagerItem = function ( text, pageIndex, xtraAttrs ) {
    var self               = this,
        pageIndexAttr      = '',
        formattedXtraAttrs = ''
    ;

    if ( pageIndex !== undefined ) {
        pageIndexAttr = self.settings.showPageIndexAttribute+'="'+pageIndex+'"';
    }

    formattedXtraAttrs = $.map( (xtraAttrs || {}), function(index, val) {
        return index+'="'+val+'"';
    }).join(' ');

    $( self.settings.pagerListSelector )
        .append('<li  '+pageIndexAttr+' '+formattedXtraAttrs+'><a>'+text+'</a></li>')
    ;
};





function Options() {}

Options.prototype.getDefaults = function() {
    return {
        filter: {
            filterInputSelector: '',
            ignoreCase: false,
            notFilterAttribute: 'data-no-filter',
        },
        pager:  {
            useDottedPager: true,
            pagerListSelector: '',
            rowsPerPage: 5,
            noOfShownPagesStartEnd: 2,
            noOfShownPagesNextToCurrentPage: 1,
            customFilterAttributes: [],
            inactivPagerIndex: '-1',
            firstLable: '',
            prevLable: '',
            nextLable: '',
            lastLable: '',
        },
        sorter: {
            sortTriggerSelector: '',
            jumpPageOneAfterSort: true,
            notSortableAttribute: 'data-no-sort',
            initalSortColIndex: -1,
        }
    };
};

Options.prototype.getUneditableDefaults = function() {
    return {
        filter: {
            filteredAttribute:       'data-is-filtered',
        },
        pager:  {
            pageIndexAttribute:     'data-page-index',
            showPageIndexAttribute: 'data-show-page-index',
            displayType:            'table-row',
            currentPageIndex:       '1',
        },
        sorter: {
            sortedAttribute:        'data-sort-by',
        },
        events: {
            sorted:                 'sorted',
            filtered:               'filtered',
            updated:                'updated',
            paged:                  'paged',
            refresh:                'refresh'
        }
    };
};


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
        self.filter = new Filter( self.element, self.settings.filter, function() { self.afterFilter(); } );
    }
    if ( self.settings.shouldSort )   {
        self.sorter = new Sorter( self.element, self.settings.sorter, function() { self.afterSort(); } );
    }
    if ( self.settings.shouldPaginate ) {
        self.pager  = new Pager ( self.element, self.settings.pager, function() { self.afterPaginate(); } );
        self.pager.paginate();
    }

    $(self.element).on( self.settings.events.refresh, function() {
        if ( self.settings.shouldFilter ) {
            self.filter.filter();
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

})( jQuery, window, document );
