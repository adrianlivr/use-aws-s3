import { throwError } from '.';
import { configMock } from '../../utils/test/configMock';

describe('throwError', () => {
  it('should be defined', () => {
    expect(throwError).toBeDefined();
  });

  it("should return 'bucketName' error", () => {
    const configMockModified = { ...configMock, bucketName: '' };
    expect(() => throwError(configMockModified)).toThrow(
      new Error('Your bucketName cannot be empty'),
    );
  });

  it("should return 'region' error", () => {
    const configMockModified = { ...configMock, region: '' };
    expect(() => throwError(configMockModified)).toThrow(
      new Error('Must provide a valid region to use your bucket'),
    );
  });

  it("should return 'accessKeyId' error", () => {
    const configMockModified = { ...configMock, accessKeyId: '' };
    expect(() => throwError(configMockModified)).toThrow(
      new Error('Must provide accessKeyId'),
    );
  });

  it("should return 'secretAccessKey' error", () => {
    const configMockModified = { ...configMock, secretAccessKey: '' };
    expect(() => throwError(configMockModified)).toThrow(
      new Error('Must provide secretAccessKey'),
    );
  });
});
