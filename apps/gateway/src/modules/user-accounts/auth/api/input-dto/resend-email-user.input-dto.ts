import { IsEmail } from 'class-validator';
import { TrimDecorator } from '../../../../../common/decorators/trim.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendEmailUserInputDTO {
  @ApiProperty({
    example: 'justmyshots@gmail.com',
    description: 'Email пользователя для переотправки кода',
  })
  @TrimDecorator()
  @IsEmail()
  email: string;
}
