import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('TCP_SERVICE_FILES') private readonly client: ClientProxy,
  ) {}

  @Get('test')
  async getData(): Promise<unknown> {
    return await firstValueFrom(
      this.client.send('get_data', { text: 'Привет, Микросервис Files!' }),
    );
  }
}
