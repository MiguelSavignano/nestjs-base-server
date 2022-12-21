import { Controller, Get, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
import { context, trace } from '@opentelemetry/api';
import axios from 'axios';

export class HealthResponse {
  @ApiProperty()
  success: boolean;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('proxy')
  async proxy() {
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
    const spanContext = trace.getSpan(context.active()).spanContext();
    return { traceId: spanContext.traceId, success: true };
  }
}
