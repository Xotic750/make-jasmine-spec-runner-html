#!/usr/bin/env node

'use strict';

var buildSpecRunner = require('../');

try {
  buildSpecRunner();
  return 0;
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e);
  return 1;
}
