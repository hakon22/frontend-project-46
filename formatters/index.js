/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format) => {
  if (format === 'plain') return plain;
  if (format === 'json') return json;
  return stylish;
};
