import { Test, TestingModule } from '@nestjs/testing';
import { OpenTelemetrySetupModule } from 'nestjs-opentelemetry-setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController 2', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        OpenTelemetrySetupModule.forRoot({
          serviceName: 'test',
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Fails', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
