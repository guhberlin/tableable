
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



