import server from '$/$server';
import {API_BASE_PATH, CORS_ORIGIN, PORT} from '$/service/envValues';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import type {FastifyServerFactory} from 'fastify';
import Fastify from 'fastify';

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({serverFactory});
  app.register(helmet);
  app.register(cors, {origin: CORS_ORIGIN, credentials: true});

  // app.register(cors, {origin: true});

  app.register(cookie);
  server(app, {basePath: API_BASE_PATH});

  return app;
};

// import {init} from '$/service/app';
// import {PORT} from '$/service/envValues';

init().listen({port: PORT, host: '0.0.0.0'});