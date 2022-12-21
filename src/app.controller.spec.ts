import { Test, TestingModule } from '@nestjs/testing';
import { OpenTelemetrySetupModule } from 'nestjs-opentelemetry-setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { httpClientProvider } from './http-client/axios';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        OpenTelemetrySetupModule.forRoot({
          serviceName: 'test-app',
        }),
      ],
      controllers: [AppController],
      providers: [AppService, httpClientProvider],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
