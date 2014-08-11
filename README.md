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
- [ ] finish testcases for sorter
- [ ] optional sorting on init

## History

Check [Releases](https://github.com/socnab/tableable/releases) for detailed changelog.

## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 socnab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

