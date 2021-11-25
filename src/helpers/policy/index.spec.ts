import { getPolicy } from '.';
import { configMock } from '../../utils/test/configMock';

describe('getPolicy', () => {
  it('should be defined', () => {
    expect(getPolicy).toBeDefined();
  });

  it('should return a base64 string', () => {
    const base64Regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    const policy = getPolicy(configMock);

    expect(policy).toMatch(base64Regex);
  });
});
