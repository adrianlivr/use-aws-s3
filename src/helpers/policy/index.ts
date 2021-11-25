import { dateISOString, dateYMD, xAmzDate } from '../date';
import { Config, Policy as PolicyType } from '../../types';

export function getPolicy(config: Config): string {
  const policy = (): PolicyType => {
    const policyObj: PolicyType = {
      expiration: dateISOString,
      conditions: [
        { acl: config.acl || 'public-read' },
        { bucket: config.bucketName },
        [
          'starts-with',
          '$key',
          `${config.dirName ? config.dirName + '/' : ''}`,
        ],
        ['starts-with', '$Content-Type', ''],
        ['starts-with', '$x-amz-meta-tag', ''],
        { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
        {
          'x-amz-credential': `${config.accessKeyId}/${dateYMD}/${config.region}/s3/aws4_request`,
        },
        { 'x-amz-date': xAmzDate },
        { 'x-amz-meta-uuid': '14365123651274' },
        { 'x-amz-server-side-encryption': 'AES256' },
      ],
    };

    config.sessionToken &&
      policyObj.conditions.push({
        'x-amz-security-token': config.sessionToken,
      });

    return policyObj;
  };
  //Returns a base64 policy;
  return Buffer.from(JSON.stringify(policy()))
    .toString('base64')
    .replace(/\n|\r/, '');
}
