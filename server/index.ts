import FastifyCors from '@fastify/cors';
import Fastify from 'fastify';
import {hi} from './api/hi';
import {test} from './api/test';

const fastify = Fastify();

fastify.register(FastifyCors, {});

fastify.get('/', (req, reply) => {
  reply.send({hello: 'world'});
});

fastify.register(hi);
fastify.register(test);

fastify
  .listen({port: 31577, host: '0.0.0.0'})
  .then(address => console.log(`Server listening on ${address}`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
