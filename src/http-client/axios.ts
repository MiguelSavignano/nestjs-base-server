import axios from 'axios';
import { Provider } from '@nestjs/common';
export { AxiosStatic } from 'axios';

export const httpClientProvider: Provider = {
  provide: 'httpClient',
  useFactory: function () {
    return axios;
  },
};
