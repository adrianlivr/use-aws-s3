import { useAwsS3 } from './useAwsS3';
import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import {
  deleteResponseErrorMock,
  deleteResponseSuccessMock,
  fileName,
  uploadResponseErrorMock,
  uploadResponseSuccessMock,
} from './useAwsS3.mock';
import { configMock } from '../utils/test/configMock';

global.fetch = fetchMock;

describe('useAwsS3', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should be defined', () => {
    expect(useAwsS3).toBeDefined();
  });

  it('should have the correct return', async () => {
    const { result } = renderHook(() => useAwsS3(configMock));

    expect(result.current).toHaveProperty('uploadFile');
    expect(result.current).toHaveProperty('deleteFile');
    expect(result.current).toHaveProperty('uploadResult');
    expect(result.current).toHaveProperty('deleteResult');
  });

  describe('uploadfile', () => {
    it('should resolve and return an upload result', async () => {
      const { result } = renderHook(() => useAwsS3(configMock));
      let uploadAsyncResult;

      await act(async () => {
        uploadAsyncResult = await result.current.uploadFile(
          {} as File,
          fileName,
        );
      });

      const [uploadResult] = result.current.uploadResult!;
      expect(uploadResult.data).toEqual(uploadResponseSuccessMock);
      expect(uploadAsyncResult).toEqual(uploadResponseSuccessMock);
    });

    it('should resolve and return an upload error', async () => {
      fetchMock.mockResolvedValueOnce(uploadResponseErrorMock);
      const { result } = renderHook(() => useAwsS3(configMock));
      let uploadAsyncResult;

      await act(async () => {
        try {
          await result.current.uploadFile({} as File, fileName);
        } catch (e) {
          uploadAsyncResult = e;
        }
      });

      const [uploadResult] = result.current.uploadResult!;
      expect(uploadResult.error).toEqual(uploadResponseErrorMock);
      expect(uploadAsyncResult).toEqual(uploadResponseErrorMock);
    });
  });

  describe('deleteFile', () => {
    it('should resolve and return a delete result', async () => {
      const { result } = renderHook(() => useAwsS3(configMock));
      let deleteAsyncResult;

      await act(async () => {
        deleteAsyncResult = await result.current.deleteFile(fileName);
      });

      const [deleteResult] = result.current.deleteResult!;
      expect(deleteResult.data).toEqual(deleteResponseSuccessMock);
      expect(deleteAsyncResult).toEqual(deleteResponseSuccessMock);
    });

    it('should resolve and return a delete error', async () => {
      fetchMock.mockResolvedValueOnce(deleteResponseErrorMock);
      const { result } = renderHook(() => useAwsS3(configMock));
      let deleteAsyncResult;

      await act(async () => {
        try {
          await result.current.deleteFile(fileName);
        } catch (e) {
          deleteAsyncResult = e;
        }
      });

      const [deleteResult] = result.current.deleteResult!;
      expect(deleteResult.error).toEqual(deleteResponseErrorMock);
      expect(deleteAsyncResult).toEqual(deleteResponseErrorMock);
    });
  });
});
