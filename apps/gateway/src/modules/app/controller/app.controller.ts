import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('TCP_SERVICE_FILES') private readonly client: ClientProxy,
  ) {}

  @Get('get-data')
  async getData(): Promise<unknown> {
    try {
      return await firstValueFrom(
        this.client.send('get_data', { text: 'Привет, Микросервис Files!' }),
      );
    } catch (error: unknown) {
      console.log('Error:', String(error));
      throw error;
    }
  }
}
