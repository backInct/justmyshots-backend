import { applyDecorators } from '@nestjs/common';
import { IsString, Length } from 'class-validator';
import { TrimDecorator } from '../../../decorators/trim.decorator';

export const IsStringWithTrimWithLength = (
  minLength: number,
  maxLength: number,
) => applyDecorators(IsString(), TrimDecorator(), Length(minLength, maxLength));
