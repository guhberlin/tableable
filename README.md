# jQuery tableable

### A plugin to filter, paginate and sort html tables.

## Usage

1. Include jQuery:

    ```html
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    ```

2. Include plugin:

    ```html
    <script src="dist/jquery.tableable.min.js"></script>
    ```

3. Call the plugin:

    ```javascript
    $("#element").tableable( options );
    ```

### Options

| Option                            | Type    | Description                                                                  | Default        |
| --------------------------------- | ------- | ---------------------------------------------------------------------------- | -------------- |
|FilterOpts||||
| `useFilter`                       | Boolean | en-/disable filtering                                                        | true           |
| `filterInputSelector`             | String  | selector for the filter-input-element                                        |                |
| `notFilterAttribute`              | String  | disable filter on th if they have this attr                                  | data-no-filter |
| `ignoreCase`                      | Boolean | en-/disable casesensetive filtering                                          | false          |
| `customFilterAttributes`          | Array   | custom attributes for external filters                                       | []             |
|PagerOpts||||
| `usePager`                        | Boolean | en-/disable pagination                                                       | true           |
| `pagerListSelector`               | String  | selector for the pager-ul-element                                            |                |
| `useDottedPager`                  | Boolean | en-/disable dotted pager                                                     | true           |
| `rowsPerPage`                     | Integer | number of displayed rows per page                                            | 5              |
| `noOfShownPagesStartEnd`          | Integer | number of displayed pagerElements at the start and end of the pager (*)          | 2          |
| `noOfShownPagesNextToCurrentPage` | Integer | number of displayed pagerElements on either side of the current pagerElement (*) | 1          |
|SorterOpts||||
| `useSorter`                       | Boolean | en-/disable sorting                                                          | true           |
| `notSortableAttribute`            | String  | disable sort on th if they have this attr                                    | data-no-sort   |
| `sortTriggerSelector`             | String  | selector where to find sorttrigger in th                                     |                |
| `jumpPageOneAfterSort`            | Boolean | should jump back to page one after sorting                                   | true           |
| `initalSortColIndex`              | Integer | sort the table inital by given columnindex                                   | -1             |

* ony useable with dottedPager

### Events

After filtering, sorting and pagechanging the plugin will trigger events so you can add observers. All events are triggered on the rootelement.

| Eventname     | Trigger                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `filtered`    | triggered each time the value of filter input is changed, so that the filter runs on the table |
| `sorted`      | triggered each time the table is resorted                                                      |
| `pageChanged` | triggered each time one of the page buttons is clicked                                         |
| `updated`     | triggered each time `filtered` or `sorted` is triggered                                        |


## Contributing

1. fork it!
2. create your new feature branch: `git checkout -b new-feature-name`
3. npm install
4. make your changes on the `src` folder, never on the `dist`
5. check the style: `grunt`
6. commit your changes: `git commit -m 'add some feature'`
7. push to the branch: `git push origin new-feature-name`
8. submit a pull request :D

## ToDo

- [x] add functionality for sorting table
- [x] add triggers for callbacks like `$('element').on('page-changed')`
- [x] finish testcases for sorter
- [x] optional sorting on init
- [ ] check support for different ie versions

## History

Check [Releases](https://github.com/guhberlin/tableable/releases) for detailed changelog.

## License

[BSD-3-Clause](http://opensource.org/licenses/BSD-3-Clause)

Copyright (c) 2014 guhberlin

Please see [LICENSE.md](https://github.com/guhberlin/tableable/blob/master/LICENSE.md) for detailed information.
