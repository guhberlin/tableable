/*
 *  jQuery tableable plugin - v1.2.2
 *  A plugin to filter, paginate and sort html tables
 *  
 *
 *  Made by socnab
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

	'use strict';


	var pluginName = 'tableable',
		defaults = {
			useFilter: true,
			filterInputSelector: '',
			ignoreCase: false,
			notFilterAttribute: 'data-no-filter',

			usePager: true,
			pagerListSelector: '',
			rowsPerPage: 5,

			useSorter: true,
			sortTriggerSelector: '',
			jumpPageOneAfterSort: true,
			notSortableAttribute: 'data-no-sort',
		},
		uneditableDefaults = {
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
		}
	;


	function TableAble ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options, uneditableDefaults );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}


	TableAble.prototype.init = function () {
		var self           = this,
			shouldPaginate = ( self.settings.usePager  && self.settings.pagerListSelector.length   ),
			shouldFilter   = ( self.settings.useFilter && self.settings.filterInputSelector.length ),
			shouldSort     = ( self.settings.useSorter && ( $(self.element).find('thead').length ) )
		;

		if ( shouldFilter ) { self.initFilter( self, shouldPaginate ); }
		if ( shouldSort )   { self.initSort(   self, shouldPaginate ); }

		if ( shouldPaginate ) { self.paginate(); }

	};
	TableAble.prototype.trigger = function( eventName, autoTriggerUpdate ) {
		var self = this,
			triggerUpdate = ( autoTriggerUpdate === undefined ) ? true : autoTriggerUpdate
		;

		$( self.element ).trigger( eventName );

		if ( triggerUpdate ) { $( self.element ).trigger( self.settings.updatedEvent ); }
	};


	TableAble.prototype.initFilter = function( self, shouldPaginate ) {

		$( self.settings.filterInputSelector ).keyup( function() {
			self.filter( $(this).val() );

			if ( shouldPaginate ) {
				self.settings.currentPageIndex = '1';
				self.paginate();
			}

			self.trigger( self.settings.filteredEvent );
		});

	};
	TableAble.prototype.filter = function ( searched ) {
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


	TableAble.prototype.initSort = function( self, shouldPaginate ) {
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

				if ( shouldPaginate ) {
					if ( self.settings.jumpPageOneAfterSort ) {
						self.settings.currentPageIndex = '1';
					}
					self.paginate();
				}

				self.trigger( self.settings.sortedEvent );
			});

		});

	};


	TableAble.prototype.sortRows = function( colIndex ) {
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
	TableAble.prototype.sortWithCallback = function( sortCallBack ) {
		var self = this,
			rows = $( self.element ).children( 'tbody' ).children( 'tr' )
		;

		if ( rows.length ) {

			$( self.element ).children( 'tbody' ).empty();
			rows = rows.sort( sortCallBack );
			$( self.element ).children( 'tbody' ).append( rows );

		}
	};
	TableAble.prototype.sortAsc = function( colIndex ) {
		var self = this;

		self.sortWithCallback( function(a,b) {
				return (
					($(b).find(':nth-child('+colIndex+')').text()) < ($(a).find(':nth-child('+colIndex+')').text())
				);
			}
		);
	};
	TableAble.prototype.sortDesc = function( colIndex ) {
		var self = this;

		self.sortWithCallback( function(a,b) {
				return (
					($(b).find(':nth-child('+colIndex+')').text()) > ($(a).find(':nth-child('+colIndex+')').text())
				);
			}
		);
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
				if ( (index%self.settings.rowsPerPage) === 0 ) { pageCount++; }
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
			$( self.settings.pagerListSelector ).append('<li '+self.settings.pageSwitchPageAttribute+'="'+i+'" ><a>'+i+'</a></li>');
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

		$( self.settings.pagerListSelector +' li['+self.settings.pageSwitchPageAttribute+']' )
			.removeClass( 'active' )
			.filter( function() {
				return ( $(this).attr(self.settings.pageSwitchPageAttribute) === pageIndex );
			})
			.addClass( 'active' )
		;

		self.trigger( self.settings.pageChangedEvent, false );
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
