import { ConfigModule } from '@nestjs/config';
import { envFilePath } from './env-file-path';

export const configModule = ConfigModule.forRoot({
  envFilePath: envFilePath,
  isGlobal: true,
});
