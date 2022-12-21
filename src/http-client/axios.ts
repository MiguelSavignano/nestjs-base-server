import axios from 'axios';
import { Provider } from '@nestjs/common';
export { AxiosStatic } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const httpClientProvider: Provider = {
  provide: 'httpClient',
  useFactory: function () {
    return axios;
  },
};

let axiosMock: MockAdapter;
export const httpClientProviderMock: Provider = {
  provide: 'httpClient',
  useFactory: function () {
    axiosMock = new MockAdapter(axios);
    return axios;
  },
};

export { axiosMock };
