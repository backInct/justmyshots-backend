import { IsUUID } from 'class-validator';
import { Trim } from '../../../../../common/decorators/trim.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationConfirmationUserInputDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Код подтверждения пользователя',
  })
  @Trim()
  @IsUUID(4)
  code: string;
}
