import {S3_BUCKET, S3_ENDPOINT} from '$/service/envValues';
import {jugiment, s3Client} from '$/service/s3Client';
import {ListObjectsCommand, PutObjectCommand} from '@aws-sdk/client-s3';

export const photoRepository = {
  getPhotos: async () => {
    const command = new ListObjectsCommand({Bucket: S3_BUCKET});
    const response = await s3Client.send(command);
    return (
      response.Contents?.map(
        content => `${S3_ENDPOINT}/${S3_BUCKET}/${content.Key}`,
      ) || []
    );
  },
  uploadPhoto: async (file: Buffer, mimetype: string) => {
    if (jugiment() === false) 'minioに対応してません';
    const key = `photos/${Date.now()}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: file,
        ContentType: mimetype,
      }),
    );
    const url = `${S3_ENDPOINT}/ ${S3_BUCKET}/${key}`;
    return url;
  },
  // uploadPhoto: async (file: Blob, mimetype: string) => {
  //   const key = `photos/${Date.now()}`;
  //   await s3Client.send(
  //     new PutObjectCommand({
  //       Bucket: S3_BUCKET,
  //       Key: key,
  //       Body: file,
  //       ContentType: mimetype,
  //     }),
  //   );
  //   const url = `${S3_ENDPOINT}/${S3_BUCKET}/${key}`;
  //   return url;
  // },

  uploadPhotoBlob: async (file: Buffer, mimetype: string) => {
    const key = `photos/${Date.now()}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: file,
        ContentType: mimetype,
      }),
    );
    const url = `${S3_ENDPOINT}/${S3_BUCKET}/${key}`;
    return url;
  },
};
