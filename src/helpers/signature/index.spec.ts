import { getSignature } from '.';
import { configMock } from '../../utils/test/configMock';
import { getPolicy } from '../policy';

describe('getSignature', () => {
  it('should be defined', () => {
    expect(getSignature).toBeDefined();
  });

  it('should return a signature string', () => {
    const signature = getSignature(
      configMock,
      '20211123',
      getPolicy(configMock),
    );

    expect(signature).toHaveLength(64);
  });
});
