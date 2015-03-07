# About readdir-recursive-promise
Read directory and return promise or directory object with files

# Install
`npm install --save readdir-recursive-promise`

# Examples

## Return promise
```javascript
var rdr = require('readdir-recursive-promise');

rdr.readdirAsync('directory').then(function(res) {
    console.log(res);
});
```

## Normal callback
```javascript
var rdr = require('readdir-recursive-promise');

rdr.readdir('directory', function(err, res) {
    console.log(err, res);
});
```
