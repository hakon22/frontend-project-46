/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';

export default (format) => {
  if (format === 'plain') return plain;
  return stylish;
};
