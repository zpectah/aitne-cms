const getSalt = (length = 16) => {
  const array = new Uint8Array(length);

  window.crypto.getRandomValues(array);

  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const hashPassword = async (password: string, salt: string) => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);

  const key = await window.crypto.subtle.importKey(
    'raw',
    saltBuffer,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );

  const signature = await window.crypto.subtle.sign('HMAC', key, passwordBuffer);

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const verifyPassword = async (storedSalt: string, storedHash: string, inputPassword: string): Promise<boolean> => {
  const isMatch = await verifyPassword(storedSalt, storedHash, inputPassword);

  return isMatch;
};

export default {
  getSalt,
  hashPassword,
  verifyPassword,
};
