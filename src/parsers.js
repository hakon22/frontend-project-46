import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (file) => {
  const format = path.extname(file);
  if (format === '.json') {
    return JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
  }
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(fs.readFileSync(path.resolve(file), 'utf8'));
  }
  return false;
};
