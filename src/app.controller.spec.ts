import axios from 'axios';
import { TraceService } from 'nestjs-opentelemetry-setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  const appController = new AppController(
    new AppService(),
    new TraceService(),
    axios,
  );

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
