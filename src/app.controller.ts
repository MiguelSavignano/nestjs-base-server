import { Controller, Get, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
import axios from 'axios';
import { TraceService } from 'nestjs-opentelemetry-setup';

export class HealthResponse {
  @ApiProperty()
  success: boolean;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly traceService: TraceService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/my-endpoint')
  async proxy() {
    Logger.log('log example');
    const span = this.traceService.startSpan('my_custom_span_name');
    // do something
    span.end();
    const { data } = await axios.get(
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
