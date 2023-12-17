import FastifyCors from '@fastify/cors';
import Fastify from 'fastify';

const fastify = Fastify();

fastify.register(FastifyCors, {});

fastify.get('/', (req, reply) => {
  reply.send({hello: 'world'});
});

fastify.get('/hi', (req, reply) => {
  reply.send({hello: 'how are you?'});
});

fastify
  .listen({port: 8888, host: '0.0.0.0'})
  .then(address => console.log(`Server listening on ${address}`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
