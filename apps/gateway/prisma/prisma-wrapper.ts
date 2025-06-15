import { config } from 'dotenv';
import { execSync } from 'child_process';
import { envFilePath } from '../src/core/env-file-path';
import * as process from 'node:process';

config({
  path: envFilePath,
});

const prismaCommand = process.argv[2];
console.log('###################################');
console.log('# Start prisma command: ' + prismaCommand);
console.log('###################################');

execSync(prismaCommand, { stdio: 'inherit' });
