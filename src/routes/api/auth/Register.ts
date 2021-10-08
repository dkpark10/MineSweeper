import { Request, Response, NextFunction } from 'express';
import sanitize from 'sanitize-html';
import Encrypter from '../../../util/Crypto';
import db from '../../../models/User';
import { userInfo } from 'os';

const sanitizeOption = {
  allowedTags: [],
}

const isExistUser = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const column: string = sanitize(Object.keys(request.query)[0], sanitizeOption);
    const value: string = sanitize(Object.values(request.query)[0] as string, sanitizeOption);

    if (value === '' || !value) {
      throw new Error('query string is empty');
    }

    const result: boolean = await db.isExistUser({ column: column, value: value });

    return response.status(200).send({ exists: result });

  }
  catch (e) {

    // 에러(네트워크, 기타) 발생시 유저가 존재한다는 응답을 보냄으로서 회원가입을 막는다.
    response.status(200).send({ exists: true, msg: e });
  }
}

const register = async (request: Request, response: Response, next: NextFunction) => {

  try {
    const dirtyUserBeRegistered = request.body as string[];
    const [id, email, passWord] = dirtyUserBeRegistered
      .map((ele: string) => sanitize(ele, sanitizeOption));

    const encrypter: Encrypter = new Encrypter();
    const salt: string = await encrypter.createSalt();
    const encryptedPassword: string = await encrypter.getCryptoPassword(salt, passWord);

    const result = await db.register({
      id: id,
      email: email,
      pwd: encryptedPassword,
    })
      .then(res => db.registSalt(id, salt))
      .then(res => response.status(200).send({ data: res }));
  }
  catch (e) {

  }
}

export { isExistUser, register };