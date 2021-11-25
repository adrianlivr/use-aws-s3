import * as shortId from 'short-uuid';

export const getFileName = (file: File, newFileName?: string) => {
  if (newFileName && newFileName.includes('.')) return newFileName;

  const [, fileExtension] = file.type.split('/');
  return `${newFileName || shortId.generate()}.${fileExtension}`;
};
