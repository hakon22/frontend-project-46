/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import diff from '../index.js';

const path = process.cwd();
const file1 = `${path}/__fixtures__/file1.json`;
const file2 = `${path}/__fixtures__/file2.json`;
const file3 = `${path}/__fixtures__/file2.jso`;
const file4 = `${path}/__fixtures__/file1.jso`;
const file5 = `${path}/__fixtures__/file1.yml`;
const file6 = `${path}/__fixtures__/file2.yml`;
const file7 = `${path}/__fixtures__/newfile1.json`;
const file8 = `${path}/__fixtures__/newfile2.json`;
const file9 = `${path}/__fixtures__/newfile1.yml`;
const file10 = `${path}/__fixtures__/newfile2.yml`;
const resultJson = `${path}/__fixtures__/result-json.txt`;
const resultYml = `${path}/__fixtures__/result-yml.txt`;
const resultJsonRec = `${path}/__fixtures__/result-json-rec.txt`;
const resultYmlRec = `${path}/__fixtures__/result-yml-rec.txt`;
const resultPlain = `${path}/__fixtures__/result-plain.txt`;
const temp = `${path}/__fixtures__/test.txt`;
const readFile = (filepath) => readFileSync(filepath, 'utf8');

test.each([
  [file1, file2, readFile(resultJson)],
  [file3, file4, '{\n}'],
  [file5, file6, readFile(resultYml)],
  [file7, file8, readFile(resultJsonRec), 'stylish'],
  [file9, file10, readFile(resultYmlRec)],
  [file9, file10, readFile(resultPlain), 'plain'],
])('genDiff test(%#)', (a, b, expected, format = 'stylish') => {
  writeFileSync(temp, diff(a, b, format));
  expect(readFile(temp)).toBe(expected);
  unlinkSync(temp);
});
