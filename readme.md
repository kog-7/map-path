#   map-path   #

require map path


![](https://img.shields.io/npm/v/map-path.svg?style=flat)


## useage

// use utils

```js  
let utils=require('map-path')('Utils');
```

// map path in map-path.js which in the root dir
```js
const nodepath=require('path');
module.exports={
  'Utils':nodepath.join(__dirname,'./src/utils.js')
}
```
