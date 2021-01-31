import { UploadedFile } from 'express-fileupload';

export const buildName = (file: UploadedFile): string => {
  const uniqueName = /[0-9a-z]+$/.exec(file.tempFilePath)[0];
  const extension = /[0-9a-z]+$/.exec(file.name)[0];

  return `${uniqueName}.${extension}`;
};
