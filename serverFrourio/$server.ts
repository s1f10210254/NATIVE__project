import type { FastifyMultipartAttachFieldsToBodyOptions, MultipartFile } from '@fastify/multipart';
import type { ReadStream } from 'fs';
import type { HttpStatusOk, AspidaMethodParams } from 'aspida';
import type { Schema } from 'fast-json-stringify';
import type { z } from 'zod';
import hooksFn_81jpt9 from 'api/me/hooks';
import hooksFn_1hlvxfl from 'api/tasks/hooks';
import validatorsFn_1m4eoxd from 'api/tasks/_taskId@string/validators';
import controllerFn_1qxyj9s from 'api/controller';
import controllerFn_vvrvb3 from 'api/health/controller';
import controllerFn_1c8eilo from 'api/hi/controller';
import controllerFn_11w57lb from 'api/me/controller';
import controllerFn_so5vkl from 'api/session/controller';
import controllerFn_4j1ikj from 'api/tasks/controller';
import controllerFn_c5qc1 from 'api/tasks/di/controller';
import controllerFn_1o7e4u2 from 'api/tasks/_taskId@string/controller';
import controllerFn_14za1lp from 'api/test/controller';
import controllerFn_awanum from 'api/test10/controller';
import type { FastifyInstance, RouteHandlerMethod, preValidationHookHandler, FastifySchema, FastifySchemaCompiler, RouteShorthandOptions, onRequestHookHandler, preParsingHookHandler, preHandlerHookHandler } from 'fastify';

export type FrourioOptions = {
  basePath?: string;
  multipart?: FastifyMultipartAttachFieldsToBodyOptions;
};

type HttpStatusNoOk = 301 | 302 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 409 | 500 | 501 | 502 | 503 | 504 | 505;

type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type BaseResponse<T, U, V> = {
  status: V extends number ? V : HttpStatusOk;
  body: T;
  headers: U;
};

type ServerResponse<K extends AspidaMethodParams> =
  | (K extends { resBody: K['resBody']; resHeaders: K['resHeaders'] }
  ? BaseResponse<K['resBody'], K['resHeaders'], K['status']>
  : K extends { resBody: K['resBody'] }
  ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'headers'>
  : K extends { resHeaders: K['resHeaders'] }
  ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'body'>
  : PartiallyPartial<
      BaseResponse<K['resBody'], K['resHeaders'], K['status']>,
      'body' | 'headers'
    >)
  | PartiallyPartial<BaseResponse<any, any, HttpStatusNoOk>, 'body' | 'headers'>;

export type MultipartFileToBlob<T extends Record<string, unknown>> = {
  [P in keyof T]: Required<T>[P] extends MultipartFile
    ? Blob | ReadStream
    : Required<T>[P] extends MultipartFile[]
    ? (Blob | ReadStream)[]
    : T[P];
};

type BlobToFile<T extends AspidaMethodParams> = T['reqFormat'] extends FormData
  ? {
      [P in keyof T['reqBody']]: Required<T['reqBody']>[P] extends Blob | ReadStream
        ? MultipartFile
        : Required<T['reqBody']>[P] extends (Blob | ReadStream)[]
        ? MultipartFile[]
        : T['reqBody'][P];
    }
  : T['reqBody'];

type RequestParams<T extends AspidaMethodParams> = Pick<{
  query: T['query'];
  body: BlobToFile<T>;
  headers: T['reqHeaders'];
}, {
  query: Required<T>['query'] extends {} | null ? 'query' : never;
  body: Required<T>['reqBody'] extends {} | null ? 'body' : never;
  headers: Required<T>['reqHeaders'] extends {} | null ? 'headers' : never;
}['query' | 'body' | 'headers']>;

type ServerHandler<T extends AspidaMethodParams, U extends Record<string, unknown> = {}> = (
  req: RequestParams<T> & U,
) => ServerResponse<T>;

type ServerHandlerPromise<T extends AspidaMethodParams, U extends Record<string, unknown> = {}> = (
  req: RequestParams<T> & U,
) => Promise<ServerResponse<T>>;

type AddedHandler<T, R extends Record<string, unknown>> = T extends (req: infer U, ...args: infer V) => infer W ? (req: U & Partial<R>, ...args: V) => W : never;

export type ServerHooks<R extends Record<string, unknown> = {}> = {
  onRequest?: AddedHandler<onRequestHookHandler, R> | AddedHandler<onRequestHookHandler, R>[];
  preParsing?: AddedHandler<preParsingHookHandler, R> | AddedHandler<preParsingHookHandler, R>[];
  preValidation?: AddedHandler<preValidationHookHandler, R> | AddedHandler<preValidationHookHandler, R>[];
  preHandler?: AddedHandler<preHandlerHookHandler, R> | AddedHandler<preHandlerHookHandler, R>[];
};

export type ServerMethodHandler<T extends AspidaMethodParams,  U extends Record<string, unknown> = {}> = ServerHandler<T, U> | ServerHandlerPromise<T, U> | {
  validators?: { [Key in keyof RequestParams<T>]?: z.ZodType<RequestParams<T>[Key]>};
  schemas?: { response?: { [V in HttpStatusOk]?: Schema }};
  hooks?: ServerHooks<U>;
  handler: ServerHandler<T, U> | ServerHandlerPromise<T, U>;
};

const parseNumberTypeQueryParams = (numberTypeParams: [string, boolean, boolean][]): preValidationHookHandler => (req, reply, done) => {
  const query: any = req.query;

  for (const [key, isOptional, isArray] of numberTypeParams) {
    const param = isArray ? (query[`${key}[]`] ?? query[key]) : query[key];

    if (isArray) {
      if (!isOptional && param === undefined) {
        query[key] = [];
      } else if (!isOptional || param !== undefined) {
        const vals = (Array.isArray(param) ? param : [param]).map(Number);

        if (vals.some(isNaN)) {
          reply.code(400).send();
          return;
        }

        query[key] = vals as any;
      }

      delete query[`${key}[]`];
    } else if (!isOptional || param !== undefined) {
      const val = Number(param);

      if (isNaN(val)) {
        reply.code(400).send();
        return;
      }

      query[key] = val as any;
    }
  }

  done();
};

const callParserIfExistsQuery = (parser: OmitThisParameter<preValidationHookHandler>): preValidationHookHandler => (req, reply, done) =>
  Object.keys(req.query as any).length ? parser(req, reply, done) : done();

const validatorCompiler: FastifySchemaCompiler<FastifySchema> = ({ schema }) => (data: unknown) => {
  const result = (schema as z.ZodType<unknown>).safeParse(data);
  return result.success ? { value: result.data } : { error: result.error };
};

const validatorsToSchema = ({ query, ...validators }: { query?: unknown; body?: unknown; headers?: unknown }): FastifySchema => ({
  ...(query !== undefined ? { querystring: query } : {}),
  ...validators,
});

const methodToHandler = (
  methodCallback: ServerHandler<any, any>,
): RouteHandlerMethod => (req, reply) => {
  const data = methodCallback(req as any) as any;

  if (data.headers !== undefined) reply.headers(data.headers);

  reply.code(data.status).send(data.body);
};

const asyncMethodToHandler = (
  methodCallback: ServerHandlerPromise<any, any>,
): RouteHandlerMethod => async (req, reply) => {
  const data = await methodCallback(req as any) as any;

  if (data.headers !== undefined) reply.headers(data.headers);

  reply.code(data.status).send(data.body);
};

export default (fastify: FastifyInstance, options: FrourioOptions = {}) => {
  const basePath = options.basePath ?? '';
  const hooks_81jpt9 = hooksFn_81jpt9(fastify);
  const hooks_1hlvxfl = hooksFn_1hlvxfl(fastify);
  const validators_1m4eoxd = validatorsFn_1m4eoxd(fastify);
  const controller_1qxyj9s = controllerFn_1qxyj9s(fastify);
  const controller_vvrvb3 = controllerFn_vvrvb3(fastify);
  const controller_1c8eilo = controllerFn_1c8eilo(fastify);
  const controller_11w57lb = controllerFn_11w57lb(fastify);
  const controller_so5vkl = controllerFn_so5vkl(fastify);
  const controller_4j1ikj = controllerFn_4j1ikj(fastify);
  const controller_c5qc1 = controllerFn_c5qc1(fastify);
  const controller_1o7e4u2 = controllerFn_1o7e4u2(fastify);
  const controller_14za1lp = controllerFn_14za1lp(fastify);
  const controller_awanum = controllerFn_awanum(fastify);

  fastify.get(basePath || '/', methodToHandler(controller_1qxyj9s.get));

  fastify.get(`${basePath}/health`, asyncMethodToHandler(controller_vvrvb3.get));

  fastify.get(`${basePath}/hi`, methodToHandler(controller_1c8eilo.get));

  fastify.get(
    `${basePath}/me`,
    {
      preHandler: hooks_81jpt9.preHandler,
    } as RouteShorthandOptions,
    methodToHandler(controller_11w57lb.get),
  );

  fastify.post(
    `${basePath}/session`,
    {
      preHandler: controller_so5vkl.post.hooks.preHandler,
    } as RouteShorthandOptions,
    methodToHandler(controller_so5vkl.post.handler),
  );

  fastify.delete(
    `${basePath}/session`,
    {
      preHandler: controller_so5vkl.delete.hooks.preHandler,
    } as RouteShorthandOptions,
    methodToHandler(controller_so5vkl.delete.handler),
  );

  fastify.get(
    `${basePath}/tasks`,
    {
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([['limit', true, false]])),
      preHandler: hooks_1hlvxfl.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_4j1ikj.get),
  );

  fastify.post(
    `${basePath}/tasks`,
    {
      schema: validatorsToSchema(controller_4j1ikj.post.validators),
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_4j1ikj.post.handler),
  );

  fastify.patch(
    `${basePath}/tasks`,
    {
      schema: validatorsToSchema(controller_4j1ikj.patch.validators),
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_4j1ikj.patch.handler),
  );

  fastify.delete(
    `${basePath}/tasks`,
    {
      preHandler: hooks_1hlvxfl.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_4j1ikj.delete),
  );

  fastify.get(
    `${basePath}/tasks/di`,
    {
      preHandler: hooks_1hlvxfl.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_c5qc1.get),
  );

  fastify.patch(
    `${basePath}/tasks/:taskId`,
    {
      schema: {
        ...validatorsToSchema(controller_1o7e4u2.patch.validators),
        params: validators_1m4eoxd.params,
      },
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_1o7e4u2.patch.handler),
  );

  fastify.delete(
    `${basePath}/tasks/:taskId`,
    {
      schema: {
        params: validators_1m4eoxd.params,
      },
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler,
    } as RouteShorthandOptions,
    asyncMethodToHandler(controller_1o7e4u2.delete),
  );

  fastify.get(`${basePath}/test`, methodToHandler(controller_14za1lp.get));

  fastify.get(`${basePath}/test10`, methodToHandler(controller_awanum.get));

  return fastify;
};
