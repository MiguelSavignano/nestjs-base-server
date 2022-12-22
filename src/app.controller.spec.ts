import { AppController } from './app.controller';
import { axiosMock } from './http-client/axios';
import { testApp } from '../test/spec_helper/nestjsTestApp';

describe('AppController', () => {
  let appController: AppController;
  const expectedTodo = { id: 1 };

  beforeEach(async () => {
    const app = await testApp();
    appController = app.get(AppController);
    axiosMock
      .onGet('https://jsonplaceholder.typicode.com/todos/1')
      .reply(200, expectedTodo);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('myEndpoint', () => {
    it('return todo 1', async () => {
      expect(await appController.myEndpoint()).toEqual(expectedTodo);
    });
  });
});
