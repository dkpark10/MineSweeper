import crypto from 'crypto';

class encryptionHandler {

  private static instance: encryptionHandler;
  private constructor() {

  }

  public static getInstance() {

    if (!encryptionHandler.instance) {
      encryptionHandler.instance = new encryptionHandler();
    }
    return encryptionHandler.instance;
  }

  public createSalt(): Promise<string> {

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

  public cryptoPassword(plaintext: string, salt: string): Promise<string> {

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

  public getCryptoPassword = async (salt: string, plaintext: string): Promise<string> => {
    return await this.cryptoPassword(plaintext, salt);
  }
}

export default encryptionHandler.getInstance();

