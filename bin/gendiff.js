#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from '../index.js';

const program = new Command();

const arr = {};
const format = (value) => {
  if (value === 'plain') {
    arr.value = value;
  }
  if (value === 'json') {
    arr.value = value;
  }
  if (value === 'stylish') {
    arr.value = value;
  }
  return arr.value;
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1')
  .option('-f, --format <type>', 'output format', format)
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => console.log(genDiff(file1, file2, arr.value)));

program.parse();
program.opts();
