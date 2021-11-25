import { Config } from '../../types';

const buildUrl = ({ bucketName, region }: Config): string => {
  const [countryCode] = region.split('-');

  switch (countryCode) {
    case 'cn':
      return `https://${bucketName}.s3.${region}.amazonaws.com.${countryCode}`;
    default:
      return `https://${bucketName}.s3-${region}.amazonaws.com`;
  }
};

export default (config: Config): string => {
  if (config.s3Url && config.s3Url !== '') {
    return config.s3Url;
  }

  return buildUrl(config);
};
