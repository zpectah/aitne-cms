import crypto from 'node:crypto';

export const node_getSalt = (length = 16) => crypto.randomBytes(length).toString('hex');

export const node_hashPassword = (password, salt) => {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);

  return hash.digest('hex');
};

export const node_verifyPassword = (storedSalt, storedHash, inputPassword) => {
  const hash = node_hashPassword(inputPassword, storedSalt);

  return hash === storedHash;
}
