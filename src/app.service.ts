import { Injectable } from '@nestjs/common';
import { ConfigContext } from './ConfigContext';

@Injectable()
export class AppService {
  constructor(private configContext: ConfigContext) {}

  getHello(): string {
    return 'Hello World!';
  }

  getContext() {
    return this.configContext.current;
  }
}
