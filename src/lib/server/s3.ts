import S3 from 'aws-sdk/clients/s3.js';
import { env } from './env';

export const s3 = new S3({
	endpoint: env.S3_URL,
	accessKeyId: env.S3_ACCESS_KEY_ID,
	secretAccessKey: env.S3_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
});
