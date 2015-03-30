
function Constants( element ) {
    this.element     = element;
    this.elementType = ($(element).prop('tagName').toLowerCase()==='table') ? 'table' : 'block';

    this.selectors       = {};
    this.selectors.table = this.getTableSelectors();
    this.selectors.block = this.getBlockSelectors();
}

Constants.prototype.get = function( domain, constantName ) {
    var self = this;
    switch ( domain ) {
        case 'selector':
            return self.selectors[self.elementType][(constantName.toLowerCase())];
        default:
            return self[domain][(constantName.toLowerCase())];
    }
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
