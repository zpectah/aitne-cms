import crypto from 'node:crypto';
import fs from 'fs';

const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    return fs.mkdirSync(directory);
  }
}

const createFile = (path, content) => fs.writeFileSync(path, content);

const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const isEmailValid = (email) => !!validateEmail(email);

const getTimestamp = () => {
  const now = new Date();

  return now.toISOString();
};

const getSalt = (length = 16) => crypto.randomBytes(length).toString('hex');

const hashPassword = (password, salt) => {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);

  return hash.digest('hex');
};

const verifyPassword = (storedSalt, storedHash, inputPassword) => {
  const hash = hashPassword(inputPassword, storedSalt);

  return hash === storedHash;
}

export default {
  createDirectory,
  createFile,
  validateEmail,
  isEmailValid,
  getTimestamp,
  getSalt,
  hashPassword,
  verifyPassword,
};
