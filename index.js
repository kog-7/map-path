let nodepath = require("path");

let store = null;
let cwd = process.cwd();

let readConfig = () => {
  let ph = false;
  try {
    ph = require(nodepath.join(cwd, "map-path.js"));
  } catch (e) {
    throw e;
  }
  return ph;
};

let addJsPrefix = path => {
  let last = path.lastIndexOf("/");
  last = last === -1 ? 0 : last;
  let ph = path.slice(last);
  if (ph.indexOf(".") === -1) {
    //no .file
    path = path + "/index.js";
  }
  return path;
};

let mapPath = (ph, type) => {
  if (store === null) {
    store = readConfig();
    if (!(typeof store === "object")) {
      throw `map-path.js must use format like module.exports={name:real path}`;
    }
  }
  let phArr = ph.split("/");
  phArr = phArr.map(p => {
    if (p) {
      return p;
    } else {
      return false;
    }
  });
  let firstPath = phArr.shift();
  if (!(firstPath in store)) {
    throw `${firstPath} is not map in map-path.js`;
  }

  let outPath = nodepath.join(store[firstPath], phArr.join("/"));
  if (type === "url") {
    return outPath;
  } else {
    return require(addJsPrefix(outPath));
  }
};

mapPath.setRoot = url => {
  cwd = url;
};

module.exports = mapPath;
