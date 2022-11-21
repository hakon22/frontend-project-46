#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>');

program.parse();