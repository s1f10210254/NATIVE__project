import type {AspidaClient, BasicHeaders} from 'aspida';
import {dataToURLString} from 'aspida';
import type {Methods as Methods_by08hd} from '.';
import type {Methods as Methods_18qsrps} from './health';
import type {Methods as Methods_1uc1f5c} from './me';
import type {Methods as Methods_g2ofzy} from './session';
import type {Methods as Methods_w6o6q4} from './tasks';
import type {Methods as Methods_1vagdt3} from './tasks/_taskId@string';
import type {Methods as Methods_cw3756} from './tasks/di';
import type {Methods as Methods_curlay} from './test';
import type {Methods as Methods_1f22vmb} from './test10';

const api = <T>({baseURL, fetch}: AspidaClient<T>) => {
  const prefix = (
    baseURL === undefined ? 'http://localhost:31577' : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/health';
  const PATH1 = '/me';
  const PATH2 = '/session';
  const PATH3 = '/tasks';
  const PATH4 = '/tasks/di';
  const PATH5 = '/test';
  const PATH6 = '/test10';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    health: {
      get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_18qsrps['get']['resBody']>(
          prefix,
          PATH0,
          GET,
          option,
        ).json(),
      $get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_18qsrps['get']['resBody']>(prefix, PATH0, GET, option)
          .json()
          .then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    me: {
      get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody']>(
          prefix,
          PATH1,
          GET,
          option,
        ).json(),
      $get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody']>(prefix, PATH1, GET, option)
          .json()
          .then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    session: {
      post: (option: {
        body: Methods_g2ofzy['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<Methods_g2ofzy['post']['resBody']>(
          prefix,
          PATH2,
          POST,
          option,
        ).json(),
      $post: (option: {
        body: Methods_g2ofzy['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<Methods_g2ofzy['post']['resBody']>(prefix, PATH2, POST, option)
          .json()
          .then(r => r.body),
      delete: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_g2ofzy['delete']['resBody']>(
          prefix,
          PATH2,
          DELETE,
          option,
        ).json(),
      $delete: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_g2ofzy['delete']['resBody']>(
          prefix,
          PATH2,
          DELETE,
          option,
        )
          .json()
          .then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    tasks: {
      _taskId: (val1: string) => {
        const prefix1 = `${PATH3}/${val1}`;

        return {
          patch: (option: {
            body: Methods_1vagdt3['patch']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<
              Methods_1vagdt3['patch']['resBody'],
              BasicHeaders,
              Methods_1vagdt3['patch']['status']
            >(prefix, prefix1, PATCH, option).json(),
          $patch: (option: {
            body: Methods_1vagdt3['patch']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<
              Methods_1vagdt3['patch']['resBody'],
              BasicHeaders,
              Methods_1vagdt3['patch']['status']
            >(prefix, prefix1, PATCH, option)
              .json()
              .then(r => r.body),
          delete: (option?: {config?: T | undefined} | undefined) =>
            fetch<
              Methods_1vagdt3['delete']['resBody'],
              BasicHeaders,
              Methods_1vagdt3['delete']['status']
            >(prefix, prefix1, DELETE, option).json(),
          $delete: (option?: {config?: T | undefined} | undefined) =>
            fetch<
              Methods_1vagdt3['delete']['resBody'],
              BasicHeaders,
              Methods_1vagdt3['delete']['status']
            >(prefix, prefix1, DELETE, option)
              .json()
              .then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      di: {
        get: (option?: {config?: T | undefined} | undefined) =>
          fetch<Methods_cw3756['get']['resBody']>(
            prefix,
            PATH4,
            GET,
            option,
          ).json(),
        $get: (option?: {config?: T | undefined} | undefined) =>
          fetch<Methods_cw3756['get']['resBody']>(prefix, PATH4, GET, option)
            .json()
            .then(r => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
      get: (
        option?:
          | {
              query?: Methods_w6o6q4['get']['query'] | undefined;
              config?: T | undefined;
            }
          | undefined,
      ) =>
        fetch<Methods_w6o6q4['get']['resBody']>(
          prefix,
          PATH3,
          GET,
          option,
        ).json(),
      $get: (
        option?:
          | {
              query?: Methods_w6o6q4['get']['query'] | undefined;
              config?: T | undefined;
            }
          | undefined,
      ) =>
        fetch<Methods_w6o6q4['get']['resBody']>(prefix, PATH3, GET, option)
          .json()
          .then(r => r.body),
      post: (option: {
        body: Methods_w6o6q4['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<Methods_w6o6q4['post']['resBody']>(
          prefix,
          PATH3,
          POST,
          option,
        ).json(),
      $post: (option: {
        body: Methods_w6o6q4['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<Methods_w6o6q4['post']['resBody']>(prefix, PATH3, POST, option)
          .json()
          .then(r => r.body),
      patch: (option: {
        body: Methods_w6o6q4['patch']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods_w6o6q4['patch']['resBody'],
          BasicHeaders,
          Methods_w6o6q4['patch']['status']
        >(prefix, PATH3, PATCH, option).json(),
      $patch: (option: {
        body: Methods_w6o6q4['patch']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods_w6o6q4['patch']['resBody'],
          BasicHeaders,
          Methods_w6o6q4['patch']['status']
        >(prefix, PATH3, PATCH, option)
          .json()
          .then(r => r.body),
      delete: (option: {
        body: Methods_w6o6q4['delete']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods_w6o6q4['delete']['resBody'],
          BasicHeaders,
          Methods_w6o6q4['delete']['status']
        >(prefix, PATH3, DELETE, option).json(),
      $delete: (option: {
        body: Methods_w6o6q4['delete']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods_w6o6q4['delete']['resBody'],
          BasicHeaders,
          Methods_w6o6q4['delete']['status']
        >(prefix, PATH3, DELETE, option)
          .json()
          .then(r => r.body),
      $path: (
        option?:
          | {method?: 'get' | undefined; query: Methods_w6o6q4['get']['query']}
          | undefined,
      ) =>
        `${prefix}${PATH3}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    test: {
      get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_curlay['get']['resBody']>(
          prefix,
          PATH5,
          GET,
          option,
        ).text(),
      $get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_curlay['get']['resBody']>(prefix, PATH5, GET, option)
          .text()
          .then(r => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    test10: {
      get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_1f22vmb['get']['resBody']>(
          prefix,
          PATH6,
          GET,
          option,
        ).text(),
      $get: (option?: {config?: T | undefined} | undefined) =>
        fetch<Methods_1f22vmb['get']['resBody']>(prefix, PATH6, GET, option)
          .text()
          .then(r => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
    get: (option?: {config?: T | undefined} | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option).text(),
    $get: (option?: {config?: T | undefined} | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option)
        .text()
        .then(r => r.body),
    $path: () => `${prefix}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
