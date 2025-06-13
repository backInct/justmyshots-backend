import { join } from 'path';

const ROOT_DIR = process.cwd();

export const TEMPLATES_DIR = join(
  ROOT_DIR,
  'apps',
  'gateway',
  'src',
  'templates',
);
