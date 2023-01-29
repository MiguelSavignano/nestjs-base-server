import { Controller, Get, Inject } from '@nestjs/common';
import { HealthResponse } from './dto/health-response.dto';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

const KAFKA_TOPICS = {
  PING_EVENT: 'ping',
};

@Controller()
export class AppController {
  constructor(@Inject('MAIN_KAFKA_CLIENT') private clientKafka: ClientKafka) {}

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf(KAFKA_TOPICS.PING_EVENT);
  }

  @MessagePattern(KAFKA_TOPICS.PING_EVENT)
  killDragon(@Payload() message: any, @Ctx() context: KafkaContext): any {
    console.log('pong');
    console.log('Kafka on message', message);
  }

  @Get('/emit')
  emitKafka() {
    this.clientKafka.emit(
      KAFKA_TOPICS.PING_EVENT,
      JSON.stringify({ data: 'Hello world!' }),
    );
    return { success: true };
  }

  @Get('/health')
  health(): HealthResponse {
    return { success: true };
  }
}
