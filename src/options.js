
function Options() {}

Options.prototype.getDefaults = function() {
    return {
        useFilter: true,
        filterInputSelector: '',
        ignoreCase: false,
        notFilterAttribute: 'data-no-filter',

        usePager: true,
        useDottedPager: true,
        pagerListSelector: '',
        rowsPerPage: 5,

        useSorter: true,
        sortTriggerSelector: '',
        jumpPageOneAfterSort: true,
        notSortableAttribute: 'data-no-sort',

        initalSortColIndex: -1,
    };
};

Options.prototype.getUneditableDefaults = function() {
    return {
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
    };
};
