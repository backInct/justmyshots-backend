import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { parseBool } from '../transformers/parse-bool';

export class AppConfigDTO {
  @IsInt()
  @Type(() => Number)
  port: number;

  @IsString()
  @IsNotEmpty()
  env: string;

  @IsEmail()
  adminEmail: string;

  @IsString()
  @IsNotEmpty()
  adminEmailPassword: string;

  @IsString()
  @IsNotEmpty()
  postgresURI: string;

  @IsOptional()
  @IsBoolean()
  @Transform(parseBool)
  isSwaggerEnabled?: boolean;

  @IsString()
  @IsNotEmpty()
  globalPrefix: string;
}
