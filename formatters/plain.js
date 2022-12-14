/* eslint-disable import/extensions */
import { logic } from '../src/logic.js';

const getFormattedValue = (value) => {
  if (typeof value === 'string' && value.startsWith('{')) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (obj, obj3, r = '') => {
  const { diff } = logic(obj, obj3);
  const iter = (d, s) => {
    const result = d.map((item) => {
      const str = s === '' ? item.key : `${s}.${item.key}`;
      if (item.object === 'yes') return plain(obj[item.key], obj3[item.key], str);
      if (item.status === 'removed') return `Property '${str}' was removed`;
      if (item.status === 'new') {
        return `Property '${str}' was added with value: ${getFormattedValue(item.value)}`;
      }
      if (item.status === 'changed' && item.object !== 'yes') {
        return `Property '${str}' was updated. From ${getFormattedValue(item.value.oldValue)} to ${getFormattedValue(item.value.newValue)}`;
      }
      return null;
    });
    return result.filter(Boolean).join('\n');
  };
  return iter(diff, r);
};

export default plain;
