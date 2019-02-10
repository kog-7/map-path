let { assert, expect } = require("chai");
let main = require("../../src/index");
const nodepath = require("path");
const cwd = process.cwd();

describe("utils", function() {
  let config = {
    Utils: "./src/utils"
  };
  main.setStore(config);
  let arr = [["Utils", nodepath.join(cwd, "src/utils.js")]];
  arr.forEach(item => {
    it(`${item[0]} point to ${item[1]} path`, function() {
      assert.equal(main(item[0], "url"), item[1]);
    });
  });
});
