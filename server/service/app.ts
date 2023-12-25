import server from '$/$server';
import {API_BASE_PATH, S3_BUCKET} from '$/service/envValues';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import type {FastifyServerFactory} from 'fastify';
import Fastify from 'fastify';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {PutObjectCommand} from '@aws-sdk/client-s3';
import {s3Client} from './s3Client';

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({serverFactory, bodyLimit: 10485760});
  app.register(helmet);
  // app.register(cors, { origin: CORS_ORIGIN, credentials: true });
  app.register(cors, {credentials: true});
  app.register(cookie);

  // app.post('/api/upload', async (req, reply) => {
  //   try {
  //     // console.log('1');
  //     // const data = await req.file();
  //     // console.log('Received file', data);
  //     // const fileBuffer = await data?.toBuffer();
  //     console.log('1');
  //     const body = (await req.body) as any;
  //     console.log('2', body);
  //     const base64Data = body.image;
  //     const buffer = Buffer.from(base64Data, 'base64');
  //     const key = `photos/${Date.now()}`;
  //     await s3Client.send(
  //       new PutObjectCommand({
  //         Bucket: S3_BUCKET,
  //         Key: key,
  //         Body: buffer,
  //         ContentType: 'image/jpeg',
  //       }),
  //     );
  //   } catch (error) {
  //     console.error('Upload Failed:', error);
  //     reply.status(500).send({error: 'File upload failed'});
  //   }
  // });

  app.get('/api/generate-presigned-url', async (req, reply) => {
    try {
      const key = `uploads/${Date.now()}`;
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
      });

      const url = await getSignedUrl(s3Client, command, {expiresIn: 60});
      reply.send({key, url});
    } catch (error) {
      console.error(error);
      reply.status(500).send('サーバーエラー');
    }
  });
  server(app, {basePath: API_BASE_PATH});

  return app;
};
