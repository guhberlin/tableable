# jQuery tableable

### A plugin to filter and pager html tables.

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

| Option | Description | Default |
| ------------- | ----------- | ----------- |
| `useFilter` | en-/disable filtering | true |
| `filterInputSelector` | selector for the filter-input-element |  |
| `ignoreCase` | en-/disable casesensetive filtering | false |
| `usePager` | en-/disable pagination | true |
| `pagerListSelector` | selector for the pager-ul-element |  |
| `rowsPerPage` | number of displayed rows per page | 5 |

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

- [ ] add functionality for sorting table

## History

Check [Releases](https://github.com/manuelpiesold/tableable/releases) for detailed changelog.

## License

MIT License
