import GetUrl from '.';
import { configMock } from '../../utils/test/configMock';

describe('GetUrl', () => {
  it('should be defined', () => {
    expect(GetUrl).toBeDefined();
  });

  it('should return a valid url', () => {
    const { bucketName, region } = configMock;
    const validUrl = `https://${bucketName}.s3-${region}.amazonaws.com`;

    expect(GetUrl(configMock)).toBe(validUrl);
  });
});
