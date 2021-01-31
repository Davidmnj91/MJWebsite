import { configureHttpClient, RequestInterceptor } from '@mj-website/http';
import AuthService from './AuthService';

const jsonInterceptor: RequestInterceptor = {
  intercept: (init: RequestInit): RequestInit => {
    //init.headers = { ...init.headers, ...{ 'Content-Type': 'Application/json' } };
    if (init.method !== 'GET') {
      init.headers = { ...init.headers, ...{ Authorization: `Bearer ${AuthService.token}` } };
    }
    return init;
  },
};

const http = configureHttpClient([jsonInterceptor]);

export default http;
