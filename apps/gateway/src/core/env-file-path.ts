import { join } from 'path';

// При использовании process.cwd() получаем такой путь:
// D:\projects\justmyshots-backend
// При использовании __dirname:
// D:\projects\justmyshots-backend\dist\apps\gateway
// ConfigModule должен получать путь к .env с корня проекта, а не от скомпилированного dist приложения
// Поэтому использование process.cwd() предпочтительней для корректной работы
const ROOT_DIR = process.cwd();
const ENV_DIR = 'apps/gateway/src/env';

export const envFilePath = [
  process.env.ENV_FILE_PATH?.trim() || '',
  join(ROOT_DIR, ENV_DIR, `.env.${process.env.NODE_ENV}.local`),
  join(ROOT_DIR, ENV_DIR, `.env.${process.env.NODE_ENV}`),
  join(ROOT_DIR, ENV_DIR, '.env.production'),
];
