import fs from 'fs';

const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    return fs.mkdirSync(directory);
  }
}

const createFile = (path, content) => fs.writeFileSync(path, content);

export default {
  createDirectory,
  createFile,
};
