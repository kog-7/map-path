let nodepath = require("path");
let cwd = process.cwd();
let utils = require('./utils.js');

class MapPath {
  constructor() {
    this.store = null;
    this.root = cwd;
  }
  readConfig() {
    let ph = false;
    let { root } = this;

    try {
      ph = require(nodepath.resolve(root, "map-path.js"));
    } catch (e) {
      throw e;
    }
    return ph;
  }
  get(ph, type) {
    let { store, root } = this;
    if (store === null) {
      store = this.store = this.readConfig();
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
    let aimFile = store[firstPath];
    if (!nodepath.isAbsolute(aimFile)) {
      aimFile = nodepath.join(root, aimFile);
    }

    let outPath = nodepath.join(aimFile, phArr.join("/"));
    if (type === "url") {
      return utils.addJsPrefix(outPath);
    } else {
      return require(utils.addJsPrefix(outPath));
    }
  }
  setStore(store) {
    this.store = store;
  }
  setRoot(root) {

    if (typeof root !== "string") {
      return;
    }
    this.root = root;
  }
}

let defaultMapPath = new MapPath();

let mapPathEntity = function (ph, type) {
  let out = defaultMapPath.get(ph, type);
  return out;
};


mapPathEntity.setRoot = function (root) {
  defaultMapPath.setRoot(root);
};

mapPathEntity.setStore = function (store) {
  defaultMapPath.setStore(store);
};







module.exports = mapPathEntity;




