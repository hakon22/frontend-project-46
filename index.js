/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
import getFormat from './src/parsers.js';
import formatter from './formatters/index.js';

export default (path1, path2, format = 'stylish') => {
  const obj1 = getFormat(path1);
  const obj2 = getFormat(path2);
  const f = formatter(format);
  return f(obj1, obj2);
};
