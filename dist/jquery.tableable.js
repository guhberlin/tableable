/*
 *  jQuery tableable plugin - v0.1.0
 *  A plugin to filter and pager html tables
 *  
 *
 *  Made by manuel piesold
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'tableable',
		defaults = {
			useFilter: true,
			filterInputSelector: '',
			usePager: true,
			pagerListSelector: '',
			elementsPerPage: 3
		},
		uneditableDefaults = {
			displayType:             'table-row',
			filteredAttribute:       'data-is-filtered',
			pageIndexAttribute:      'data-page-index',
			pageSwitchPageAttribute: 'data-show-page-index',
			currentPageIndex:        '1'
		};

	function TableAble ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options, uneditableDefaults );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	TableAble.prototype.init = function () {
		var self = this,
			shouldPaginate = ( self.settings.usePager && self.settings.pagerListSelector.length ),
			shouldFilter = ( self.settings.useFilter && self.settings.filterInputSelector.length )
		;

		if ( shouldFilter ) {
			$( self.settings.filterInputSelector ).keyup( function() {
				self.filter( $(this).val() );

				if ( shouldPaginate ) { self.paginate(); }
			});
		}

		if ( shouldPaginate ) { self.paginate(); }

	};

	TableAble.prototype.paginate = function () {
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
				if ( (index%self.settings.elementsPerPage) === 0 ) { pageCount++; }
				$(this).attr( self.settings.pageIndexAttribute, pageCount );
			})
		;

		self.buildPagerList( pageCount );
		self.showPage( self.settings.currentPageIndex );

	};

	TableAble.prototype.buildPagerList = function ( pageCount ) {
		var self = this;

		$( self.settings.pagerListSelector ).empty();
		for ( var i=1; i <= pageCount; i++ ) {
			$( self.settings.pagerListSelector ).append('<li '+self.settings.pageSwitchPageAttribute+'="'+i+'" >'+i+'</li>');
		}

		$( self.settings.pagerListSelector +' li['+self.settings.pageSwitchPageAttribute+']' ).on('click', function() {
			self.showPage( $(this).attr( self.settings.pageSwitchPageAttribute ) );
		});
	};

	TableAble.prototype.showPage = function ( pageIndex ) {
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
		$( self.settings.pagerListSelector +' li['+self.settings.pageSwitchPageAttribute+'="'+pageIndex+'"]' ).addClass('active');
	};

	TableAble.prototype.filter = function ( searched ) {
		var self = this;
		$( self.element )
			.children( 'tbody' )
			.children( 'tr' )
			.css( 'display', 'none' )
			.attr( self.settings.filteredAttribute, '' )
			.each( function() {
				var row = $(this);
				row.children( 'td' ).each( function(index, val) {
					if ( $(val).text().indexOf( searched ) >= 0 ) {
						row.css( 'display', self.settings.displayType ).removeAttr( self.settings.filteredAttribute );
						return;
					}
				});
			})
		;
	};

	$.fn[ pluginName ] = function ( options ) {
		this.each(function() {
			if ( !$.data( this, 'plugin_' + pluginName ) ) {
				$.data( this, 'plugin_' + pluginName, new TableAble( this, options ) );
			}
		});

		return this;
	};

	$.fn.hasAttr = function( name ) {
   		return this.attr( name ) !== undefined;
	};

})( jQuery, window, document );
