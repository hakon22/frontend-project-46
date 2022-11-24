/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
import _ from 'lodash';
import getFormat from './data/parsers.js';

export const genDiff = (path1, path2, format = undefined) => {
  const obj1 = getFormat(path1, format);
  const obj2 = getFormat(path2, format);
  const mergeFiles = { ...obj1, ...obj2 };
  const uniqueKeys = _.sortBy(Object.keys(mergeFiles));
  const diff = uniqueKeys.map((key) => {
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      return { key, value: obj1[key], status: 'removed' };
    } if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      return { key, value: obj2[key], status: 'new' };
    } if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
      return { key, value: obj1[key], status: 'same' };
    }
    return { key, value: { oldValue: obj1[key], newValue: obj2[key] }, status: 'changed' };
  });
  const result = diff.reduce((acc, item) => {
    if (item.status === 'removed') {
      acc.push(`  - ${item.key}: ${item.value}`);
    } if (item.status === 'new') {
      acc.push(`  + ${item.key}: ${item.value}`);
    } if (item.status === 'same') {
      acc.push(`    ${item.key}: ${item.value}`);
    } if (item.status === 'changed') {
      acc.push(`  - ${item.key}: ${item.value.oldValue}`);
      acc.push(`  + ${item.key}: ${item.value.newValue}`);
    }
    return acc;
  }, ['{']);
  result.push('}');
  return result.join('\n');
};

export default genDiff;
