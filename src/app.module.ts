import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from 'nestjs-prometheus-setup';

@Module({
  imports: [PrometheusModule.fromRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
