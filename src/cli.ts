#!/usr/bin/env node

const assert = require('assert');
// @ts-ignore
import * as dot from 'dot-object';
import * as main from './main';

const [, , method, args = ''] = process.argv;

assert(method, 'Missing method');

async function init() {
  const argArr = args.split(',');

  console.log(`Calling "${method}" with arguments: "${argArr.join()}"`);

  const result = await dot.pick(method, main).apply({}, argArr);
  console.log('Execution result', result);
}

init();
