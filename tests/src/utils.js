let { assert, expect } = require("chai");
let utils = require("../../src/utils");
const nodepath = require("path");

describe("utils", function() {
  let baseSrc = "../../src";
  let arr = [
    [
      nodepath.join(__dirname, baseSrc),
      nodepath.join(__dirname, baseSrc, "index.js")
    ],
    [
      nodepath.join(__dirname, baseSrc, "utils"),
      nodepath.join(__dirname, baseSrc, "utils.js")
    ]
  ];
  arr.forEach(item => {
    it(`${item[0]} point to ${item[1]} path`, function() {
      assert.equal(utils.addJsPrefix(item[0]), item[1]);
    });
  });
});
