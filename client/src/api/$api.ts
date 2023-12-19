import type { AspidaClient } from 'aspida';
import type { Methods as Methods_by08hd } from '.';
import type { Methods as Methods_18qsrps } from './health';
import type { Methods as Methods_1yrd359 } from './hi';
import type { Methods as Methods_1bn11ry } from './minio';
import type { Methods as Methods_curlay } from './test';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:31577' : baseURL).replace(/\/$/, '');
  const PATH0 = '/health';
  const PATH1 = '/hi';
  const PATH2 = '/minio';
  const PATH3 = '/test';
  const GET = 'GET';
  const POST = 'POST';

  return {
    health: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_18qsrps['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_18qsrps['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    hi: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH1, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1yrd359['get']['resBody']>(prefix, PATH1, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    minio: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1bn11ry['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1bn11ry['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1bn11ry['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1bn11ry['post']['resBody']>(prefix, PATH2, POST, option, 'FormData').json(),
      $post: (option: { body: Methods_1bn11ry['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1bn11ry['post']['resBody']>(prefix, PATH2, POST, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    test: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_curlay['get']['resBody']>(prefix, PATH3, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_curlay['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
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
