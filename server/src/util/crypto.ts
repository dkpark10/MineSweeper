import crypto from 'crypto';

export const createSalt = (): Promise<string> => {
  return new Promise((reslove, reject) => {
    crypto.randomBytes(64, (err: Error | null, buffer: Buffer) => {
      if (err) {
        reject(err);
      } else {
        reslove(buffer.toString('base64'));
      }
    })
  });
}

export const getCryptoPassword = (plaintext: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plaintext, salt, 82824, 64, 'sha512', (err: Error | null, key: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(key.toString('base64'));
      }
    });
  });
}