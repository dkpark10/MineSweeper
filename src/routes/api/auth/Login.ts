import { Request, Response, NextFunction } from 'express';
import Encrypter from '../../../util/crypto';
import db, { UserRow } from '../../../models/user';
import JWTHandler from '../../../util/jwttHandler';

const failMsg = '로그인 실패 비밀번호 또는 아이디가 틀립니다.' as const;

const login = async (request: Request, response: Response, next: NextFunction) => {

  try {
    const { id, pwd } = request.body;
    const secretkey = request.app.get('secret-key').jwtKey;

    const userInfo: UserRow[] = await db.getUserInfo({ columns: ['ID', 'PWD', 'GRADE', 'AUTH'], id: id });
    if (userInfo.length <= 0) {
      throw failMsg;
    }

    const encrypter: Encrypter = new Encrypter();

    const salt: string = await db.getSalt(id);
    const encryptedPassword = await encrypter.getCryptoPassword(salt, pwd);

    if (encryptedPassword !== userInfo[0].PWD) {
      throw failMsg;
    }

    const jwtHandler: JWTHandler = new JWTHandler();
    const accessToken = await jwtHandler.getToken(secretkey, '1h', {
      id: userInfo[0].ID,
      grade: userInfo[0].GRADE,
      auth: userInfo[0].AUTH
    });
    const refreshToken = await jwtHandler.getToken(secretkey, '14d');
    response.cookie('access token', '왜 로그인에선 ㅈㄹ 임....');

    db.setRefreshToken(id, refreshToken);

    return response.status(201).send({ result: true, message: '로그인 성공', token: accessToken });
  }
  catch (e) {
    return response.status(202).send({ result: false, message: e });
  }
}

export { login };