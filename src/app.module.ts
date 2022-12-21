/* eslint-disable @typescript-eslint/ban-ts-comment */
import { INestApplication, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from 'nestjs-prometheus-setup';
import {
  ControllerInjector,
  LoggerInjector,
  OpenTelemetryModule,
} from '@metinseylan/nestjs-opentelemetry';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

@Module({
  imports: [
    PrometheusModule.fromRoot(),
    OpenTelemetryModule.forRoot({
      serviceName: 'my-app',
      traceAutoInjectors: [ControllerInjector, LoggerInjector],
      // @ts-ignore
      spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static configure(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
