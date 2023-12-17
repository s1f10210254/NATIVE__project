import {FastifyInstance} from 'fastify';

export const test = async (fastify: FastifyInstance) => {
  fastify.get('/test', (req, reply) => {
    reply.send({test: 'aaaaaaaaaaaaa'});
  });
};
