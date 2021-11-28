import { Request, Response, NextFunction } from 'express';
import Encrypter from '../../../util/crypto';
import db, { UserRow } from '../../../models/db';
import { signToken } from '../../../util/jwttHandler';

const getSaltedPassword = async (id: string, pwd: string) => {
  const encrypter: Encrypter = new Encrypter();
  const salt: string = await db.getSalt(id);

  return await encrypter.getCryptoPassword(salt, pwd);
}

const login = async (request: Request, response: Response, next: NextFunction) => {

  try {
    const { id, pwd } = request.body;
    const jwtSecretKey = request.app.get('secret-key').jwtKey;

    const userInfo: UserRow[] = await db.getUserInfo({
      columns: ['ID', 'PWD', 'GRADE', 'AUTH'],
      id: id
    });

    if (userInfo.length <= 0)
      throw false;

    const encryptedPassword = await getSaltedPassword(id, pwd);

    if (encryptedPassword !== userInfo[0].PWD)
      throw false;

    const refreshToken = await signToken(jwtSecretKey, '14d');
    const accessToken = await signToken(jwtSecretKey, '1h', {
      id: userInfo[0].ID,
      grade: userInfo[0].GRADE,
      auth: userInfo[0].AUTH
    });

    db.setRefreshToken(id, refreshToken);

    response.cookie('accessToken', { id, accessToken }, {
      httpOnly: process.env.NODE_ENV === 'production',
      signed: true
    });

    return response.status(201).send({
      result: true, message: '로그인 성공', loginInfo: { id, accessToken }
    });
  }
  catch (e) {
    console.log('123error', e);
    return response.status(202).send({ result: false, message: e });
  }
}

export { login };