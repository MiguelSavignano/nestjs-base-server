/* eslint-disable @typescript-eslint/ban-ts-comment */
import { INestApplication, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from 'nestjs-prometheus-setup';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OpenTelemetrySetupModule } from 'nestjs-opentelemetry-setup';

@Module({
  imports: [
    PrometheusModule.fromRoot(),
    OpenTelemetrySetupModule.forRoot({
      serviceName: 'my-app',
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
