
function Pager ( element, options ) {
    this.element = element;
    this.settings = options;
    this.afterPaginate = function() {};

    this.settings.attrsToIgnoreRowOnPaging = [].concat(
        [this.settings.filteredAttribute], this.settings.customFilterAttributes
    );

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
            return ( !self.hasElOneOfAttrs( this, self.settings.attrsToIgnoreRowOnPaging ) );
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
                return ( !self.hasElOneOfAttrs( this, self.settings.attrsToIgnoreRowOnPaging ) );
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
        self      = this,
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


Pager.prototype.hasElOneOfAttrs = function( el, attributes ) {
    var ret = false;
    $.each(attributes, function(index, val) {
        if ( $(el).hasAttr( val ) ) { ret = true; }
    });
    return ret;
};
