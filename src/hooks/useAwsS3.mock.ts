import { getFileName } from '../helpers/fileName';
import { configMock } from '../utils/test/configMock';
import GetUrl from '../helpers/url';

export const fileName = 'image.jpg';
export const uploadResponseSuccessMock = {
  bucket: 'fake_bucket',
  key: `${configMock.dirName ? configMock.dirName + '/' : ''}${getFileName(
    {} as File,
    'image.jpg',
  )}`,
  location: `${GetUrl(configMock)}/${
    configMock.dirName ? configMock.dirName + '/' : ''
  }${fileName}`,
  status: 200,
};

export const uploadResponseErrorMock = {
  headers: {} as Headers,
  ok: false,
  redirected: false,
  status: 400,
  statusText: '400',
  type: 'error',
} as Response;

export const deleteResponseSuccessMock = {
  ok: true,
  status: 200,
  message: 'File deleted',
  fileName: fileName,
};

export const deleteResponseErrorMock = {
  headers: {} as Headers,
  ok: false,
  redirected: true,
  status: 403,
  statusText: '403',
  type: 'error',
} as Response;
