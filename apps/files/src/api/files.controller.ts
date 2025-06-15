import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class FilesController {
  constructor() {}

  @MessagePattern('get_data')
  getFiles(@Payload() data: unknown) {
    return { message: 'Привет, я Files!!', received: data };
  }
}
