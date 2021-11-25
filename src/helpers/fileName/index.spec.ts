import { getFileName } from '.';
import { fileName } from '../../hooks/useAwsS3.mock';

describe('getFileName', () => {
  it('should be defined', () => {
    expect(getFileName).toBeDefined();
  });

  it("should return a filename with 'newFileName' parameter", () => {
    expect(getFileName({} as File, fileName)).toEqual(fileName);
  });

  it("should return a filename without 'newFileName' parameter", () => {
    expect(getFileName({ type: 'image/png' } as File)).toMatch(/^\w+\.png/);
  });
});
