export interface HttpError extends Error {
  code: number;
  message: any;
  errorText: string;
}
export interface TypedResponse<T> extends Response {
  data(): Promise<T>;
}

export type ResponseType = 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer';

const buildHttpError = (response: Response, data: any): HttpError => {
  return {
    name: response.statusText,
    code: response.status,
    message: data.message || data,
    errorText: response.statusText,
  };
};

const readResponse = (response: Response, read: ResponseType) => {
  switch (read) {
    case 'json': {
      return response.json();
    }
    case 'text': {
      return response.text();
    }
    case 'blob': {
      return response.blob();
    }
    case 'formData': {
      return response.formData();
    }
    case 'arrayBuffer': {
      return response.arrayBuffer();
    }
    default:
      throw new Error(`Invalid readType ${read}`);
  }
};

const buildResponse = <T>(response: Response, read: ResponseType): TypedResponse<T> => {
  return {
    ...response,
    data: async () => {
      if (!response.ok) {
        throw buildHttpError(response, await response.json());
      }

      const data = await readResponse(response, read);
      return data as T;
    },
  };
};

export interface HttpClient {
  fetch<T>(info: RequestInfo, init?: RequestInit): Promise<T>;
  get<T>(info: RequestInfo, init?: RequestInit): Promise<T>;
  post<T>(info: RequestInfo, init?: RequestInit): Promise<T>;
  put<T>(info: RequestInfo, init?: RequestInit): Promise<T>;
  patch<T>(info: RequestInfo, init?: RequestInit): Promise<T>;
  delete(info: RequestInfo, init?: RequestInit): Promise<TypedResponse<any>>;
}

type Interceptor<T> = {
  intercept: (t: T) => T;
};

export type RequestInterceptor = Interceptor<RequestInit>;

export type ResponseInterceptor = Interceptor<Response>;

export const configureHttpClient = (
  reqInterceptors?: RequestInterceptor[],
  resInterceptors?: ResponseInterceptor[]
): HttpClient => {
  const wrapInterceptors = <T>(collection?: Interceptor<T>[], init?: T) =>
    (collection || []).reduce((acc, i) => (acc = i.intercept(acc)), init || ({} as T));

  const _doFetch = <T>(info: RequestInfo, read: ResponseType, init?: RequestInit): Promise<TypedResponse<T>> => {
    const req = wrapInterceptors(reqInterceptors, init);
    return fetch(info, req).then((response) => {
      const res = wrapInterceptors(resInterceptors, response);
      return buildResponse(res, read);
    });
  };

  return {
    fetch: <T>(info: RequestInfo, init?: RequestInit, read: ResponseType = 'json'): Promise<T> => {
      return _doFetch<T>(info, read, init).then((r) => r.data());
    },
    get: <T>(info: RequestInfo, init?: RequestInit, read: ResponseType = 'json'): Promise<T> => {
      init = { ...init, ...{ method: 'GET' } };
      return _doFetch<T>(info, read, init).then((r) => r.data());
    },
    post: <T>(info: RequestInfo, init?: RequestInit, read: ResponseType = 'json'): Promise<T> => {
      init = { ...init, ...{ method: 'POST' } };
      return _doFetch<T>(info, read, init).then((r) => r.data());
    },
    put: <T>(info: RequestInfo, init?: RequestInit, read: ResponseType = 'json'): Promise<T> => {
      init = { ...init, ...{ method: 'PUT' } };
      return _doFetch<T>(info, read, init).then((r) => r.data());
    },
    patch: <T>(info: RequestInfo, init?: RequestInit, read: ResponseType = 'json'): Promise<T> => {
      init = { ...init, ...{ method: 'PATCH' } };
      return _doFetch<T>(info, read, init).then((r) => r.data());
    },
    delete: <T>(info: RequestInfo, init?: RequestInit, read: ResponseType = 'json'): Promise<T> => {
      init = { ...init, ...{ method: 'DELETE' } };
      return _doFetch<T>(info, read, init).then((r) => r.data());
    },
  };
};
