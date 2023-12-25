import {S3Client} from '@aws-sdk/client-s3';
import {
  S3_ACCESS_KEY,
  S3_ENDPOINT,
  S3_REGION,
  S3_SECRET_KEY,
} from './envValues';

// export const s3Client = new S3Client({
//   endpoint: S3_ENDPOINT,
//   region: S3_REGION,
//   forcePathStyle: true,
//   credentials: {accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY},
// });

let s3Client;

if (S3_REGION && S3_ACCESS_KEY && S3_SECRET_KEY) {
  s3Client = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    forcePathStyle: true,
    credentials: {accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY},
  });
} else {
  // S3はローカル環境でのみ使用される
  console.log(
    'S3 configuration is missing. S3 Client will not be initialized.',
  );
}

export {s3Client};

export const jugiment = () => {
  if (process.env.S3_REGION !== undefined) {
    return true;
  } else {
    return false;
  }
};
