/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
import _ from 'lodash';

export const stylish = (obj, obj3) => {
  const rep = (c) => ' '.repeat(2 * c);
  const getValue = (v, t) => {
    if (!_.isObject(v) && !Array.isArray(v)) return v;
    const array = Object.entries(v);
    const result = array.reduce((acc, val) => {
      const [key, value] = val;
      if (!_.isObject(value)) {
        acc.push(`${rep(t)}${key}: ${value}`);
        return acc;
      }
      acc.push(`${rep(t)}${key}: ${getValue(value, t + 2)}`);
      return acc;
    }, ['{']);
    result.push(`${rep(t - 2)}}`);
    return result.join('\n');
  };
  const iter = (obj1, obj2, i) => {
    const mergeFiles = { ...obj1, ...obj2 };
    const uniqueKeys = _.sortBy(Object.keys(mergeFiles));
    const diff = uniqueKeys.map((key) => {
      const isObj = (_.isObject(obj1[key]) && !Array.isArray(obj1[key]) && _.isObject(obj2[key]) && !Array.isArray(obj2[key])) ? 'yes' : 'no';
      if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
        return {
          key, value: getValue(obj1[key], i + 3), status: 'removed', object: isObj,
        };
      } if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        return {
          key, value: getValue(obj2[key], i + 3), status: 'new', object: isObj,
        };
      } if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && _.isEqual(obj1[key], obj2[key])) {
        return {
          key, value: getValue(obj1[key], i + 3), status: 'same', object: isObj,
        };
      }
      return {
        key, value: { oldValue: getValue(obj1[key], i + 3), newValue: getValue(obj2[key], i + 3) }, status: 'changed', object: isObj,
      };
    });
    const result = diff.reduce((acc, item) => {
      if (item.object === 'yes') {
        acc.push(`  ${rep(i)}${item.key}: ${iter(obj1[item.key], obj2[item.key], i + 2)}`);
      }
      if (item.status === 'removed') {
        acc.push(`${rep(i)}- ${item.key}: ${item.value}`);
      } if (item.status === 'new') {
        acc.push(`${rep(i)}+ ${item.key}: ${item.value}`);
      } if (item.status === 'same') {
        acc.push(`  ${rep(i)}${item.key}: ${item.value}`);
      } if (item.status === 'changed' && item.object !== 'yes') {
        acc.push(`${rep(i)}- ${item.key}: ${item.value.oldValue}`);
        acc.push(`${rep(i)}+ ${item.key}: ${item.value.newValue}`);
      }
      return acc;
    }, ['{']);
    result.push(`${rep(i - 1)}}`);
    return result.join('\n');
  };
  return iter(obj, obj3, 1);
};

export default stylish;
