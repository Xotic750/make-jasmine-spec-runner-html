/**
 * @file
 * <a href="https://david-dm.org/Xotic750/make-jasmine-spec-runner-html"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/make-jasmine-spec-runner-html.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/make-jasmine-spec-runner-html#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/make-jasmine-spec-runner-html/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/make-jasmine-spec-runner-html" title="npm version">
 * <img src="https://badge.fury.io/js/make-jasmine-spec-runner-html.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Build a jasmine 1.1.3 spec runner html file.
 *
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module make-jasmine-spec-runner-html
 */

/* eslint strict: 1, max-statements: 1 */

/* global module, JSON:true */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });

  var fs = require('fs');
  var shell = require('shelljs');

  var getInfo = function (name) {
    var ret = shell.exec('npm info --json ' + name, { silent: true });
    return JSON.parse(ret.stdout);
  };

  var getLatest = function (info) {
    return info['dist-tags'].latest;
  };

  var readFile = function (path) {
    return fs.readFileSync(path, 'utf8');
  };

  var readJSON = function (path) {
    var str = readFile(path);
    return JSON.parse(str);
  };

  var buildSpecRunner = function () {
    var pkg = readJSON('./package.json');
    var indexTemplate = readFile('./node_modules/make-jasmine-spec-runner-html/templates/index.html');
    var runTemplate = readFile('./node_modules/make-jasmine-spec-runner-html/templates/run.js');
    var es5Shim = getInfo('es5-shim');
    var es6Shim = getInfo('es6-shim');
    var json3 = getInfo('json3');
    var indexHtml = indexTemplate
      .replace(/{{name}}/g, pkg.name)
      .replace(/{{es5v}}/g, getLatest(es5Shim))
      .replace(/{{es6v}}/g, getLatest(es6Shim))
      .replace(/{{json3}}/g, getLatest(json3));

    fs.writeFileSync('./tests/index.html', indexHtml, 'utf8');
    fs.writeFileSync('./tests/run.js', runTemplate, 'utf8');
  };

  module.exports = buildSpecRunner;
}());
