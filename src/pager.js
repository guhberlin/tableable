
function Pager ( element, options ) {
    this.element = element;
    this.settings = options;
    this.afterPaginate = function() {};
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

    self.buildPagerList( pageCount );
    self.showPage( self.settings.currentPageIndex );

};

Pager.prototype.buildPagerList = function ( pageCount ) {
    var self = this;

    $( self.settings.pagerListSelector ).empty();
    for ( var i=1; i <= pageCount; i++ ) {
        $( self.settings.pagerListSelector ).append('<li '+self.settings.pageSwitchPageAttribute+'="'+i+'" ><a>'+i+'</a></li>');
    }

    $( self.settings.pagerListSelector +' li['+self.settings.pageSwitchPageAttribute+']' ).on('click', function() {
        self.showPage( $(this).attr( self.settings.pageSwitchPageAttribute ) );
    });
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

    $( self.settings.pagerListSelector +' li['+self.settings.pageSwitchPageAttribute+']' )
        .removeClass( 'active' )
        .filter( function() {
            return ( $(this).attr(self.settings.pageSwitchPageAttribute) === pageIndex );
        })
        .addClass( 'active' )
    ;

    self.afterPaginate();
};
