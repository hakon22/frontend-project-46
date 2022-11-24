/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import diff from '../index.js';

const path = process.cwd();
const file1 = `${path}/__fixtures__/file1.json`;
const file2 = `${path}/__fixtures__/file2.json`;
const file3 = `${path}/__fixtures__/file2.jso`;
const file4 = `${path}/__fixtures__/file1.jso`;
const file5 = `${path}/__fixtures__/file1.yml`;
const file6 = `${path}/__fixtures__/file2.yml`;

test('genDiff JSON', () => {
  const result = diff(file1, file2);
  expect(diff(file1, file2)).toBe(result);
  expect(diff(file4, file3)).toBe('{\n}');
});

test('genDiff YAML', () => {
  const result = diff(file1, file2);
  expect(diff(file5, file6)).toBe(result);
});
