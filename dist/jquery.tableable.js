/*
 *  jQuery tableable plugin - v1.4.2
 *  A plugin to filter, paginate and sort html tables
 *  http://guhberlin.github.io/tableable
 *
 *  Made by guhberlin
 *  Under MIT License
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
    var self = this;
    searched = ( self.settings.ignoreCase ) ? searched.toLowerCase() : searched ;

    $( self.element )
        .children( 'tbody' )
        .children( 'tr' )
        .css( 'display', 'none' )
        .attr( self.settings.filteredAttribute, '' )
        .each( function() {
            var row = $(this);
            row.children( 'td' ).each( function(index, val) {
                if ( self.settings.notFilterAttribute.length &&
                     $(this).hasAttr( self.settings.notFilterAttribute ) ) {
                    return;
                }
                val = ( self.settings.ignoreCase ) ? $(val).text().toLowerCase() : $(val).text() ;
                if ( val.indexOf( searched ) >= 0 ) {
                    row.css( 'display', self.settings.displayType ).removeAttr( self.settings.filteredAttribute );
                    return;
                }
            });
        })
    ;

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


function Pager ( element, options ) {
    this.element = element;
    this.settings = options;
    this.afterPaginate = function() {};

    this.pagerListBuildFunction = 'buildDottedPagerList';
    if ( !this.settings.useDottedPager ) {
    	this.pagerListBuildFunction = 'buildFullPagerList';
    }


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
            return !( $(this).hasAttr( self.settings.filteredAttribute ) );
        }).each( function(index) {
            if ( (index%self.settings.rowsPerPage) === 0 ) { pageCount++; }
            $(this).attr( self.settings.pageIndexAttribute, pageCount );
        })
    ;

    self.showPage( self.settings.currentPageIndex );

};

Pager.prototype.getPageCount = function() {
    var self = this;
    return Math.ceil(
            ( $( self.element )
            .children( 'tbody' ).children( 'tr' )
            .filter( function() {
                return !( $(this).hasAttr( self.settings.filteredAttribute ) );
            }).length ) / self.settings.rowsPerPage
        )
    ;
};

Pager.prototype.buildPagerList = function () {
    var self = this;

    $( self.settings.pagerListSelector ).empty();

    self[self.pagerListBuildFunction]();

    $( self.settings.pagerListSelector +' li['+self.settings.pageSwitchPageAttribute+']' ).on('click', function() {
        self.showPage( $(this).attr( self.settings.pageSwitchPageAttribute ) );
    });
};

Pager.prototype.buildFullPagerList = function() {
	var
		self	  = this,
    	pageCount = self.getPageCount()
	;

    for ( var i=1; i <= pageCount; i++ ) {
        $( self.settings.pagerListSelector ).append('<li '+self.settings.pageSwitchPageAttribute+'="'+i+'" ><a>'+i+'</a></li>');
    }

};
Pager.prototype.buildDottedPagerList = function() {
	var
    	self      = this,
    	cpi       = parseInt( self.settings.currentPageIndex ),
    	pageCount = self.getPageCount(),
    	drawDots  = false
    ;

    for ( var i=1; i <= pageCount; i++ ) {
        if (
        	i === 1 || i === 2 ||
        	i === cpi || i === cpi-1 || i === cpi+1 ||
        	i === pageCount || i === pageCount-1
        ){
        	$( self.settings.pagerListSelector ).append('<li '+self.settings.pageSwitchPageAttribute+'="'+i+'" ><a>'+i+'</a></li>');
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
        .filter( function() {
            return ( $(this).attr( self.settings.pageIndexAttribute ) === pageIndex );
        })
        .css( 'display', self.settings.displayType )
    ;

    self.settings.currentPageIndex = pageIndex;
    self.buildPagerList();

    $( self.settings.pagerListSelector +' li['+self.settings.pageSwitchPageAttribute+']' )
        .removeClass( 'active' )
        .filter( function() {
            return ( $(this).attr(self.settings.pageSwitchPageAttribute) === pageIndex );
        })
        .addClass( 'active' )
    ;

    self.afterPaginate();
};


function Options() {}

Options.prototype.getDefaults = function() {
    return {
        useFilter: true,
        filterInputSelector: '',
        ignoreCase: false,
        notFilterAttribute: 'data-no-filter',

        usePager: true,
        useDottedPager: true,
        pagerListSelector: '',
        rowsPerPage: 5,

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
        pageSwitchPageAttribute: 'data-show-page-index',
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
   		return this.attr( name ) !== undefined;
	};

})( jQuery, window, document );
