let fs = require("fs");

let addJsPrefix = path => {
  let last = path.lastIndexOf("/");
  last = last === -1 ? 0 : last;
  let ph = path.slice(last);
  let outPath = path;
  if (ph.indexOf(".") === -1) {
    //no file pointer
    let firstPoint = path + ".js";
    try {
      fs.statSync(firstPoint);
      outPath = firstPoint;
    } catch (e) {
      let secondPoint = path + "/index.js";
      try {
        fs.statSync(secondPoint);
        outPath = secondPoint;
      } catch (e) {
        try{
          fs.statSync(path);
          outPath=path;
        }
        catch(e){
          throw e;
        }
      }
    }
  }
  return outPath;
};

module.exports = {
  addJsPrefix
};
