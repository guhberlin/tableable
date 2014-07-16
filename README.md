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

| Option                 | Type    | Description                               | Default        |
| ---------------------- | ------- | ----------------------------------------- | -------------- |
|FilterOpts||||
| `useFilter`            | Boolean | en-/disable filtering                     | true           |
| `filterInputSelector`  | String  | selector for the filter-input-element     |                |
| `notFilterAttribute`   | String  | disable sort on th if they have this attr | data-no-filter |
| `ignoreCase`           | Boolean | en-/disable casesensetive filtering       | false          |
|PagerOpts||||
| `usePager`             | Boolean | en-/disable pagination                    | true           |
| `pagerListSelector`    | String  | selector for the pager-ul-element         |                |
| `rowsPerPage`          | Integer | number of displayed rows per page         | 5              |
|SorterOpts||||
| `useSorter`            | Boolean | en-/disable sorting                       | true           |
| `notSortableAttribute` | String  | disable sort on th if they have this attr | data-no-sort   |
| `sortTriggerSelector`  | String  | selector where to find sorttrigger in th  |                |
| `jumpPageOneAfterSort` | Boolean | sould jump back to page one after sorting | true           |

## Contributing

1. fork it!
2. create your new feature branch: `git checkout -b new-feature-name`
3. npm install
4. make your changes on the `src` folder, never on the `dist`
5. check the style: `grunt`
6. commit your changes: `git commit -m 'add some feature'`
7. push to the branch: `git push origin new-feature-name`
8. submit a pull request ;)

## ToDo

- [x] add functionality for sorting table
- [ ] add triggers for callbacks like `$('element').on('page-changed')`

## History

Check [Releases](https://github.com/manuelpiesold/tableable/releases) for detailed changelog.

## License

MIT License
