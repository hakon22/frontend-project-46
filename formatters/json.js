/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable import/extensions */
import _ from 'lodash';

const json = (obj, obj3) => {
  const iter = (obj1, obj2) => {
    const mergeFiles = { ...obj1, ...obj2 };
    const uniqueKeys = _.sortBy(Object.keys(mergeFiles));
    const diff = uniqueKeys.flatMap((key) => {
      const isObj = (_.isObject(obj1[key]) && !Array.isArray(obj1[key]) && _.isObject(obj2[key]) && !Array.isArray(obj2[key])) ? 'yes' : 'no';
      if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
        return {
          key, value: obj1[key], status: 'removed', object: isObj,
        };
      } if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        return {
          key, value: obj2[key], status: 'new', object: isObj,
        };
      } if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && _.isEqual(obj1[key], obj2[key])) {
        return {
          key, value: obj1[key], status: 'same', object: isObj,
        };
      }
      return {
        key, value: { oldValue: obj1[key], newValue: obj2[key] }, status: 'changed', object: isObj,
      };
    });
    return JSON.stringify(diff);
  };
  return iter(obj, obj3);
};

export default json;
