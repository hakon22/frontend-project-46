/* eslint-disable import/extensions */
import { logic, rep } from '../src/logic.js';

const stylish = (obj, obj3, i = logic(obj, obj3).i) => {
  const { diff } = logic(obj, obj3, i);
  const result = diff.reduce((acc, item) => {
    if (item.object === 'yes') {
      acc.push(`  ${rep(i)}${item.key}: ${stylish(obj[item.key], obj3[item.key], i + 2)}`);
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

export default stylish;
