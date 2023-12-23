import {FastifyInstance} from 'fastify';

export const hi = async (fastify: FastifyInstance) => {
  fastify.get('/hi', (req, reply) => {
    reply.send({hello: 'how are you?'});
  });
};
