/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import diff from '../index.js';

test('genDiff', () => {
  const path = process.cwd();
  const file1 = `${path}/__fixtures__/file1.json`;
  const file2 = `${path}/__fixtures__/file2.json`;
  const result = diff(file1, file2);
  expect(diff(file1, file2)).toEqual(result);
});
