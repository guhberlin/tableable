
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
