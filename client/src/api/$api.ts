import type { AspidaClient } from 'aspida';
import type { Methods as Methods_by08hd } from '.';
import type { Methods as Methods_1yrd359 } from './hi';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:8888' : baseURL).replace(/\/$/, '');
  const PATH0 = '/hi';
  const GET = 'GET';

  return {
    hi: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option).json(),
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option).json().then(r => r.body),
    $path: () => `${prefix}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
