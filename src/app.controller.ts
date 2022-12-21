import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
import { TraceService } from 'nestjs-opentelemetry-setup';
import { AxiosStatic } from './http-client/axios';

export class HealthResponse {
  @ApiProperty()
  success: boolean;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly traceService: TraceService,
    @Inject('httpClient') private readonly axios: AxiosStatic,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/my-endpoint')
  async myEndpoint() {
    Logger.log('log example');
    const span = this.traceService.startSpan('my_custom_span_name');
    // do something
    span.end();
    const { data } = await this.axios.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    return data;
  }

  @Get('/health')
  @ApiCreatedResponse({
    type: HealthResponse,
  })
  health() {
    return { success: true };
  }
}
