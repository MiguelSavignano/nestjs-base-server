import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { TraceService } from 'nestjs-opentelemetry-setup';
import { JwtDecode } from 'nestjs-jwt-utils';
import { HealthResponse } from './dto/health-response.dto';

// change 3
class MyCustomError extends Error {}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly traceService: TraceService,
  ) {}

  @Get('/profile')
  profile(@JwtDecode() jwtData): any {
    return jwtData;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/error')
  error(): any {
    throw new MyCustomError('error message');
    return {};
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
  health(): HealthResponse {
    return { success: true };
  }
}
