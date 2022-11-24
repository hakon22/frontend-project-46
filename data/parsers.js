import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (file, formatValue) => {
  const format = path.extname(file);
  if (format === '.json' || formatValue === 'json') {
    return JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
  }
  if (format === '.yaml' || format === '.yml' || formatValue === 'yaml' || formatValue === 'yml') {
    return yaml.load(fs.readFileSync(path.resolve(file), 'utf8'));
  }
  return false;
};
