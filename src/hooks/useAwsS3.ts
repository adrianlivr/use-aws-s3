import { useState } from 'react';
import { dateYMD, xAmzDate } from '../helpers/date';
import { Config, DeleteResponse, UploadResponse } from '../types';
import { throwError } from '../helpers/errorThrower';
import GetUrl from '../helpers/url';
import { getPolicy } from '../helpers/policy';
import { getSignature } from '../helpers/signature';
import { getFileName } from '../helpers/fileName';

export function useAwsS3(config: Config) {
  const [uploadResult, setUploadResult] =
    useState<Array<{ data?: UploadResponse; error?: Response }>>();
  const [deleteResult, setDeleteResult] =
    useState<Array<{ data?: DeleteResponse; error?: Response }>>();

  const uploadFile = async (
    file: File,
    newFileName?: string,
  ): Promise<UploadResponse> => {
    throwError(config);

    const fd = new FormData();
    const fileName = getFileName(file, newFileName);
    const key = `${config.dirName ? config.dirName + '/' : ''}${fileName}`;
    const url = GetUrl(config);
    fd.append('key', key);
    fd.append('acl', config.acl || 'public-read');
    fd.append('Content-Type', file.type || 'image/*');
    fd.append('x-amz-meta-uuid', '14365123651274');
    fd.append('x-amz-server-side-encryption', 'AES256');
    fd.append(
      'X-Amz-Credential',
      `${config.accessKeyId}/${dateYMD}/${config.region}/s3/aws4_request`,
    );
    fd.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
    fd.append('X-Amz-Date', xAmzDate);
    fd.append('x-amz-meta-tag', '');
    fd.append('Policy', getPolicy(config));
    fd.append(
      'X-Amz-Signature',
      getSignature(config, dateYMD, getPolicy(config)),
    );
    fd.append('file', file);
    config.sessionToken &&
      fd.append('X-Amz-Security-Token', config.sessionToken);

    const response = await fetch(url, { method: 'post', body: fd });

    if (!response.ok) {
      setUploadResult((oldState) => [
        ...(oldState || []),
        { error: { ...response } },
      ]);
      return Promise.reject(response);
    }

    const data = {
      bucket: config.bucketName,
      key: `${config.dirName ? config.dirName + '/' : ''}${fileName}`,
      location: `${url}/${
        config.dirName ? config.dirName + '/' : ''
      }${fileName}`,
      status: response.status,
    };
    setUploadResult((oldState) => [...(oldState || []), { data }]);

    return Promise.resolve(data);
  };

  const deleteFile = async (fileName: string): Promise<DeleteResponse> => {
    const url = `https://${config.bucketName}.s3${
      config.region ? '-' + config.region : ''
    }.amazonaws.com/${config.dirName ? config.dirName + '/' : ''}${fileName}`;

    const response = await fetch(url, { method: 'delete' });
    if (!response.ok) {
      setDeleteResult((oldState) => [
        ...(oldState || []),
        { error: { ...response } },
      ]);
      return Promise.reject(response);
    }

    const data = {
      ok: response.ok,
      status: response.status,
      message: 'File deleted',
      fileName: fileName,
    };
    setDeleteResult((oldState) => [...(oldState || []), { data }]);

    return Promise.resolve(data);
  };

  return {
    uploadFile,
    deleteFile,
    uploadResult,
    deleteResult,
  };
}
