/* eslint-disable @typescript-eslint/ban-ts-comment */
import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrometheusModule } from 'nestjs-prometheus-setup';
import { OpenTelemetrySetupModule } from 'nestjs-opentelemetry-setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { HealthController } from './health.controller';
import { requestsLogger } from './libs/request-logger';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PrometheusModule.fromRoot(),
    OpenTelemetrySetupModule.forRoot({
      serviceName: configuration().opentelemetry.serviceName,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requestsLogger).forRoutes('*');
  }

  static configure(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
