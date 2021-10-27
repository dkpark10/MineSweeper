import jwt from 'jsonwebtoken';
import { UserRow } from '../models/User';

export default class JWTHandler {

  public getToken(secretKey: string, expDate: string, userInfo = {}): Promise<string> {

    return new Promise((resolve, reject) => {
      jwt.sign(userInfo,
        secretKey, {
        expiresIn: expDate
      }, (err: Error | null, token: string | undefined) => {
        if (err) {
          reject(err as Error);
        }
        else {
          resolve(token as string);
        }
      });
    });
  }
}