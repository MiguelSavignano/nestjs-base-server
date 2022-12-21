import { Test, TestingModule } from '@nestjs/testing';
import { OpenTelemetrySetupModule } from 'nestjs-opentelemetry-setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { httpClientProviderMock, axiosMock } from './http-client/axios';

describe('AppController', () => {
  let appController: AppController;
  const expectedTodo = { id: 1 };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        OpenTelemetrySetupModule.forRoot({
          serviceName: 'test-app',
        }),
      ],
      controllers: [AppController],
      providers: [AppService, httpClientProviderMock],
    }).compile();

    appController = app.get<AppController>(AppController);
    axiosMock
      .onGet('https://jsonplaceholder.typicode.com/todos/1')
      .reply(200, expectedTodo);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });

  describe('myEndpoint', () => {
    it('return todo 1', async () => {
      expect(await appController.myEndpoint()).toEqual(expectedTodo);
    });
  });
});
