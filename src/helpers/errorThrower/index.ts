import { Config } from '../../types';

export const throwError = (config: Config) => {
  const conditionsMap = new Map([
    [!config.bucketName, 'Your bucketName cannot be empty'],
    [!config.region, 'Must provide a valid region to use your bucket'],
    [!config.accessKeyId, 'Must provide accessKeyId'],
    [!config.secretAccessKey, 'Must provide secretAccessKey'],
  ]);

  for (const [condition, msg] of conditionsMap.entries())
    if (condition) throw new Error(msg);
};
