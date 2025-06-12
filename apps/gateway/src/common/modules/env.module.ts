import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

/**
 * Модуль для настройки конфигурации приложения.
 * Загружает переменные окружения из файлов .env с различным приоритетом.
 */
export const EnvModule = ConfigModule.forRoot({
  envFilePath: [join(__dirname, `../../../.env`)],
  isGlobal: true,
});
