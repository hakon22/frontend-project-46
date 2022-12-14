#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from '../index.js';

const program = new Command();

const arr = [];
const format = (value) => {
  if (value === 'plain') {
    return arr.push(value);
  }
  if (value === 'json') {
    return arr.push(value);
  }
  return arr.push('stylish');
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1')
  .option('-f, --format <type>', 'output format', format)
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => console.log(genDiff(file1, file2, arr.pop())));

program.parse();
program.opts();
