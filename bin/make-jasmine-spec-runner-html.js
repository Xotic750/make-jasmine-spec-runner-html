#!/usr/bin/env node

'use strict';

var buildSpecRunner = require('../');

try {
  buildSpecRunner();
  return 0;
} catch (e) {
  console.error(e);
  return 1;
}