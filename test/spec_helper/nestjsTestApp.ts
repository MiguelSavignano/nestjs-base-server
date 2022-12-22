import { Test, TestingModule } from '@nestjs/testing';
import { OpenTelemetrySetupModule } from 'nestjs-opentelemetry-setup';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { httpClientProviderMock } from '../../src/http-client/axios';

export async function testApp() {
  const app: TestingModule = await Test.createTestingModule({
    imports: [
      OpenTelemetrySetupModule.forRoot({
        serviceName: 'test-app',
      }),
    ],
    controllers: [AppController],
    providers: [AppService, httpClientProviderMock],
  }).compile();

  return app;
}
