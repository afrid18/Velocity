import path from 'node:path';

export const detectFileType = fileName => {
  /* return the file extension */
  var fileType = path.extname(fileName);
  return fileType;
};

