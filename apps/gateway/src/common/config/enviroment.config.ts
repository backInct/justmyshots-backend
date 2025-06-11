import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AppConfigDto {
  @IsInt()
  @Type(() => Number)
  port: number;

  @IsString()
  @IsNotEmpty()
  env: string;

  @IsString()
  @IsNotEmpty()
  refreshTokenSecret: string;

  @IsString()
  @IsNotEmpty()
  accessTokenSecret: string;

  @IsString()
  @IsNotEmpty()
  accessTokenExpirationTime: string;

  @IsString()
  @IsNotEmpty()
  refreshTokenExpirationTime: string;

  @IsString()
  @IsNotEmpty()
  adminUsername: string;

  @IsString()
  @IsNotEmpty()
  adminPassword: string;

  @IsEmail()
  adminEmail: string;

  @IsString()
  @IsNotEmpty()
  adminEmailPassword: string;

  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsString()
  @IsNotEmpty()
  typeSql: string;

  @IsString()
  @IsNotEmpty()
  hostSql: string;

  @IsInt()
  @Type(() => Number)
  portSql: number;

  @IsString()
  @IsNotEmpty()
  usernameSql: string;

  @IsString()
  @IsNotEmpty()
  passwordSql: string;

  @IsString()
  @IsNotEmpty()
  databaseNameSql: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return ['true', '1'].includes(value.toLowerCase());
    }
    return false;
  })
  isSwaggerEnabled?: boolean;

  @IsString()
  @IsNotEmpty()
  globalPrefix: string;
}
