import { Controller, Get, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';

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

  @Get('/health')
  @ApiCreatedResponse({
    type: HealthResponse,
  })
  health(): HealthResponse {
    Logger.log('health');
    return { success: true };
  }
}
