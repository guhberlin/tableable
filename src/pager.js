
function Pager ( element, options, constants, cb ) {
    this.element       = element;
    this.settings      = options;
    this.constants     = constants;
    this.afterPaginate = cb;

    this.pagerListBuildFunction = ( this.settings.useDottedPager ) ? 'buildDottedPagerList' : 'buildFullPagerList' ;

    this.paginate();
}

Pager.prototype.paginate = function () {
    var self = this,
        pageCount = 0
    ;

    $( self.element )
        .children( self.constants.get('selector','tbody') )
        .children( self.constants.get('selector','tr') )
        .removeAttr( self.settings.pageIndexAttribute )
        .filter( function() {
            return ( !Utils.Element( this ).hasOneOfAttrs( self.settings.customFilteredAttributes ) &&
                     !Utils.Element( this ).hasAttr( self.settings.filteredAttribute )
            );
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
        .children( self.constants.get('selector','tbody') )
        .children( self.constants.get('selector','tr') )
        .filter( function() {
            return ( !Utils.Element( this ).hasOneOfAttrs( self.settings.customFilteredAttributes ) &&
                     !Utils.Element( this ).hasAttr( self.settings.filteredAttribute )
            );
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
        self.appendPagerItem( self.settings.firstLable, (cpi > 1 ? 1 : self.settings.inactivPagerIndex) );
    }
    if( self.settings.prevLable.length > 0 ) {
        self.appendPagerItem( self.settings.prevLable, (cpi > 1 ? cpi-1 : self.settings.inactivPagerIndex) );
    }

    self[self.pagerListBuildFunction]();

    // next + last
    if( self.settings.nextLable.length > 0 ) {
        self.appendPagerItem( self.settings.nextLable, (cpi < pageCount ? cpi+1 : self.settings.inactivPagerIndex) );
    }
    if( self.settings.lastLable.length > 0 ) {
        self.appendPagerItem( self.settings.lastLable, (cpi < pageCount ? pageCount : self.settings.inactivPagerIndex) );
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
        .children( self.constants.get('selector','tbody') )
        .children( self.constants.get('selector','tr') )
        .css( 'display', 'none' )
        .filter( self.constants.get('selector','tr')+'['+self.settings.pageIndexAttribute+'="'+pageIndex+'"]' )
        .css( 'display', self.constants.get('displayType','tr') )
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



