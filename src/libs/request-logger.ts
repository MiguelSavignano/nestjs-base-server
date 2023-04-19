import * as audit from 'express-requests-logger';
import { Logger } from '@nestjs/common';

export const requestsLogger = audit({
  logger: Logger,
  excludeURLs: ['health', 'metrics'],
  request: {
    maskBody: ['password'],
    excludeHeaders: ['authorization'],
  },
});
