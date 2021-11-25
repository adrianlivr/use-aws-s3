import { Config } from '../../types';

const randomKey = (length = 32) =>
  [...Array(length)].map(() => Math.random().toString(36)[2]).join('');

export const configMock: Config = {
  accessKeyId: randomKey(),
  secretAccessKey: randomKey(),
  bucketName: 'fake_bucket',
  region: 'sa-east-1',
};
