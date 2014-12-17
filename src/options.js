
function Options() {}

Options.prototype.getDefaults = function() {
    return {
        filter: {
            filterInputSelector: '',
            ignoreCase: false,
            notFilterAttribute: 'data-no-filter',
            customFilteredAttributes: [],
        },
        pager:  {
            useDottedPager: true,
            pagerListSelector: '',
            rowsPerPage: 5,
            customFilteredAttributes: [],
            noOfShownPagesStartEnd: 2,
            noOfShownPagesNextToCurrentPage: 1,
            inactivPagerIndex: '-1',
            firstLable: '',
            prevLable: '',
            nextLable: '',
            lastLable: '',
        },
        sorter: {
            sortTriggerSelector: '',
            jumpPageOneAfterSort: true,
            notSortableAttribute: 'data-no-sort',
            initalSortColIndex: -1,
        }
    };
};

Options.prototype.getUneditableDefaults = function() {
    return {
        filter: {
            filteredAttribute:      'data-is-filtered',
            displayType:            'table-row',
        },
        pager:  {
            pageIndexAttribute:     'data-page-index',
            showPageIndexAttribute: 'data-show-page-index',
            displayType:            'table-row',
            currentPageIndex:       '1',
        },
        sorter: {
            sortedAttribute:        'data-sort-by',
        },
        events: {
            sorted:                 'sorted',
            filtered:               'filtered',
            updated:                'updated',
            paged:                  'paged',
            refresh:                'refresh'
        }
    };
};
