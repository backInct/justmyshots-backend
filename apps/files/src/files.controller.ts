import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class FilesController {
  constructor() {}

  @MessagePattern('get_data')
  getFiles(@Payload() data: unknown) {
    console.log(data);
    try {
      return { message: 'Привет, я Files!!', received: data };
    } catch (e: unknown) {
      console.log(String(e));
    }
  }
}
