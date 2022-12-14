/* eslint-disable import/extensions */
import { logic, rep } from '../src/logic.js';

const stylish = (obj, obj3, i = logic(obj, obj3).i) => {
  const { diff } = logic(obj, obj3, i);
  const result = diff.reduce((acc, item) => {
    if (item.object === 'yes') {
      const Key = [`  ${rep(i)}${item.key}: ${stylish(obj[item.key], obj3[item.key], i + 2)}`];
      return [...acc, ...Key];
    }
    if (item.status === 'removed') {
      const Key = [`${rep(i)}- ${item.key}: ${item.value}`];
      return [...acc, ...Key];
    } if (item.status === 'new') {
      const Key = [`${rep(i)}+ ${item.key}: ${item.value}`];
      return [...acc, ...Key];
    } if (item.status === 'same') {
      const Key = [`  ${rep(i)}${item.key}: ${item.value}`];
      return [...acc, ...Key];
    } if (item.status === 'changed' && item.object !== 'yes') {
      const Key = [`${rep(i)}- ${item.key}: ${item.value.oldValue}\n${rep(i)}+ ${item.key}: ${item.value.newValue}`];
      return [...acc, ...Key];
    }
    return acc;
  }, ['{']);
  return result.concat([`${rep(i - 1)}}`]).join('\n');
};

export default stylish;
