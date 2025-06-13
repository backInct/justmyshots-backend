import { FilesService } from '../service/files.service';
import { Module } from '@nestjs/common';
import { FilesController } from '../api/files.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.cwd() + '/.env',
      isGlobal: true,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
