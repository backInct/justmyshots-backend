import { ApiProperty } from '@nestjs/swagger';

export class RegistrationUserOutputDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Уникальный ID пользователя',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  email: string;

  @ApiProperty({ example: 'username123', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({
    example: '2023-06-01T12:34:56.789Z',
    description: 'Дата создания пользователя',
  })
  createdAt: Date;
}
