import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from 'nestjs-prometheus-setup';
import { OpenTelemetryModule } from 'nestjs-opentelemetry-setup';

@Module({
  imports: [
    PrometheusModule.fromRoot(),
    OpenTelemetryModule.fromRoot({
      serviceName: 'base-server',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
