import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { TraceService } from 'nestjs-opentelemetry-setup';
import { JwtDecode } from 'nestjs-jwt-utils';
import { HealthResponse } from './dto/health-response.dto';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('HERO_SERVICE') private client: ClientKafka,
    private readonly appService: AppService,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('hero.kill.dragon');
  }

  @MessagePattern('hero.kill.dragon')
  killDragon(@Payload() message: any, @Ctx() context: KafkaContext): any {
    console.log('Kafka on message', message, context);
    return true;
  }

  @Get('/emit')
  emitKafka() {
    this.client.emit('hero.kill.dragon', JSON.stringify({ name: 'Jhon' }));
    return { success: true };
  }

  @Get('/health')
  health(): HealthResponse {
    return { success: true };
  }
}
