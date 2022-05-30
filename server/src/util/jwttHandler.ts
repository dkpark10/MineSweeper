import jwt from 'jsonwebtoken';

const signToken = (secretKey: string, expDate: string, userInfo = {}): Promise<string> => {

  return new Promise((resolve, reject) => {
    jwt.sign(userInfo,
      secretKey, {
      expiresIn: expDate
    }, (err: Error | null, token: string | undefined) => {
      if (err) {
        reject(err as Error);
      } else {
        resolve(token as string);
      }
    });
  });
}

const verifyToken = (key: string, token: string): Promise<jwt.JwtPayload | undefined> => {

  return new Promise(resolve => {
    jwt.verify(token, key, (err, decoded) => {
      if (err)
        resolve(undefined);
      else
        resolve(decoded);
    });
  });
}

export { signToken, verifyToken };