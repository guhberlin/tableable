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
    var options = { filter: {...}, pager: {...}, sorter: {...} };
    $("#element").tableable( options );
    ```

### Options

By passing the feature-objects to options you automatically activate the feature.

####FilterOpts
| Option                            | Type    | Description                                    | Default        |
| --------------------------------- | ------- | ---------------------------------------------- | -------------- |
| `filterInputSelector`             | String  | selector for the filter-input-element          |                |
| `notFilterAttribute`              | String  | disable filter on th if they have this attr    | data-no-filter |
| `ignoreCase`                      | Boolean | en-/disable casesensetive filtering            | false          |
| `customFilterAttributes`          | Array   | custom attributes for external filters         | []             |

####PagerOpts
| Option                                        | Type    | Description                                                                  | Default |
| --------------------------------------------- | ------- | ---------------------------------------------------------------------------- | ------- |
| `pagerListSelector`                           | String  | selector for the pager-ul-element                                            |         |
| `useDottedPager`                              | Boolean | en-/disable dotted pager                                                     | true    |
| `rowsPerPage`                                 | Integer | number of displayed rows per page                                            | 5       |
| `noOfShownPagesStartEnd`<sup>1</sup>          | Integer | number of displayed pagerElements at the start and end of the pager          | 2       |
| `noOfShownPagesNextToCurrentPage`<sup>1</sup> | Integer | number of displayed pagerElements on either side of the current pagerElement | 1       |
| `inactivPagerIndex`                           | String  | PagerIndex for pagerElements that dont provoke pagechanges                   | -1      |
| `firstLable`                                  | String  | Label for pagerElement that redirects to first page <sup>2,3</sup>           |         |
| `prevLable`                                   | String  | Label for pagerElement that redirects to previous page <sup>2,3</sup>        |         |
| `nextLable`                                   | String  | Label for pagerElement that redirects to next page <sup>2,3</sup>            |         |
| `lastLable`                                   | String  | Label for pagerElement that redirects to last page <sup>2,3</sup>            |         |
(<sup>1</sup>) ony useable with dottedPager - (<sup>2</sup>) can contain HTML - (<sup>3</sup>) not shown if empty

####SorterOpts
| Option                            | Type    | Description                                    | Default        |
| --------------------------------- | ------- | ---------------------------------------------- | -------------- |
| `notSortableAttribute`            | String  | disable sort on th if they have this attr      | data-no-sort   |
| `sortTriggerSelector`             | String  | selector where to find sorttrigger in th       |                |
| `jumpPageOneAfterSort`            | Boolean | should jump back to page one after sorting     | true           |
| `initalSortColIndex`              | Integer | sort the table inital by given columnindex     | -1             |

### Events

#### Throwed by plugin

After filtering, sorting and pageing the plugin will trigger events so you can add observers. All events are triggered on the rootelement.

| Eventname     | Trigger                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `filtered`    | triggered each time the value of filter input is changed, so that the filter runs on the table |
| `sorted`      | triggered each time the table is resorted                                                      |
| `paged`       | triggered each time the table is paged                                                         |
| `updated`     | triggered each time `filtered` or `sorted` is triggered                                        |

#### Observed by plugin

| Eventname     | Trigger                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `refresh`     | you can trigger this event to retrigger filter, pager and sorter                               |

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
