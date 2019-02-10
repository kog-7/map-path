# map-path

Create aliases of module paths

![](https://img.shields.io/npm/v/map-path.svg?style=flat)

## useage

```js
let utils = require("map-path")("Utils");
let utilsUrl = require("map-path")("Utils", "url");
let Button = require("map-path")("Components/Button", "url"); //url priority，Button.js,Button/index.js only support js prefix now

```

 map path in map-path.js which in the root dir

```js
const nodepath = require("path");
module.exports = {
  Utils: './utils',//if not absulte path,will add prefix cwd to it,cwd is base where your map-path.js locate
  Components: nodepath.join(cwd, "components")
};

```

if not in rootPath

```js
require("map-path").setRoot('./env');
```

 if transform mapPath config

```js
require('map-path').setStore({//cwd is your root dir
  Utils:'./utils',
  Components:nodepath.join(cwd,"components")
})

```

#### fix

* add test