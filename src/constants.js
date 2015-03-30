
function Constants( element ) {
    this.element     = element;
    this.elementType = ($(element).prop('tagName').toLowerCase()==='table') ? 'table' : 'block';

    this.initConstants();
}

Constants.prototype.get = function( domain, constantName ) {
    var self = this;
    return self[domain][self.elementType][(constantName.toLowerCase())];
};

Constants.prototype.initConstants = function() {
    var self = this;
    var el = $(self.element);

    self.selector = {
        table: self.getTableSelectors(),
        block: self.getBlockSelectors(),
    };
    self.displayType = {
        table: self.getTableDisplayTypes( el ),
        block: self.getBlockDisplayTypes( el ),
    };

    return self;
};


Constants.prototype.getTableSelectors = function() {
    return {
        table: 'table',
        tbody: 'tbody',
        thead: 'thead',
        tfoot: 'tfoot',
        tr   : 'tr',
        th   : 'th',
        td   : 'td'
    };
};
Constants.prototype.getTableDisplayTypes = function( el ) {
    return {
        table: ( el.css('display')                       || 'table' ),
        tbody: ( el.find('tbody').first().css('display') || 'table-row-group' ),
        thead: ( el.find('thead').first().css('display') || 'table-header-group' ),
        tfoot: ( el.find('tfoot').first().css('display') || 'table-footer-group' ),
        tr   : ( el.find('tr').first().css('display')    || 'table-row' ),
        th   : ( el.find('th').first().css('display')    || 'table-cell' ),
        td   : ( el.find('td').first().css('display')    || 'table-cell' )
    };
};
Constants.prototype.getBlockSelectors = function() {
    return {
        table: '.ta-table',
        tbody: '.ta-tbody',
        thead: '.ta-thead',
        tfoot: '.ta-tfoot',
        tr   : '.ta-tr',
        th   : '.ta-th',
        td   : '.ta-td'
    };
};
Constants.prototype.getBlockDisplayTypes = function( el ) {
    return {
        table: ( el.css('display')                           || 'block' ),
        tbody: ( el.find('.ta-tbody').first().css('display') || 'block' ),
        thead: ( el.find('.ta-thead').first().css('display') || 'block' ),
        tfoot: ( el.find('.ta-tfoot').first().css('display') || 'block' ),
        tr   : ( el.find('.ta-tr').first().css('display')    || 'block' ),
        th   : ( el.find('.ta-th').first().css('display')    || 'block' ),
        td   : ( el.find('.ta-td').first().css('display')    || 'block' )
    };
};
