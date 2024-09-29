import fs from 'fs';

export const node_createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    return fs.mkdirSync(directory);
  }
}

export const node_createFile = (path, content) => fs.writeFileSync(path, content);
