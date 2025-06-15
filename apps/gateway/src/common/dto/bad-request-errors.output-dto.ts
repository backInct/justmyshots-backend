import { ApiProperty } from '@nestjs/swagger';

class ErrorMessage {
  @ApiProperty({
    example: 'title',
    description: 'Название поля, в котором ошибка',
  })
  field: string;

  @ApiProperty({
    example: 'Title is required',
    description: 'Описание ошибки',
  })
  message: string;
}

export class BadRequestErrorsOutputDto {
  @ApiProperty({
    type: [ErrorMessage],
    description: 'Список ошибок валидации',
  })
  errorsMessages: ErrorMessage[];
}
