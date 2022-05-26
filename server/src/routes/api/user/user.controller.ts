import { Request, Response, NextFunction } from 'express';
import { createSalt, getCryptoPassword } from '../../../util/crypto';
import sanitize from 'sanitize-html';
import model from '../../../models/index';
import { UserRow } from '../../../models/user';
import userVerification from '../../../middlewares/userverification';
import { signToken } from '../../../util/jwttHandler';

const USEREXIST = true;
const ENROLLSUCCESS = true;

export const login = async (request: Request, response: Response, next: NextFunction) => {

  try {
    const { userid, password } = request.body;
    const jwtSecretKey = request.app.get('secret-key').jwtKey;

    const userInfo: UserRow = await model.user.getUserInfo({
      columns: ['ID', 'PWD', 'GRADE', 'AUTH'],
      id: userid
    });

    if (!userInfo) {
      throw false;
    }

    const salt: string = await model.user.getSalt(userid);
    const encryptedPassword = await getCryptoPassword(password, salt);

    if (encryptedPassword !== userInfo.PWD)
      throw false;

    const refreshToken = await signToken(jwtSecretKey, '14d');
    const accessToken = await signToken(jwtSecretKey, '1h', {
      id: userInfo.ID,
      grade: userInfo.GRADE,
      auth: userInfo.AUTH
    });

    model.user.setRefreshToken(userid, refreshToken);

    response.cookie('accessToken', { userid, accessToken }, {
      httpOnly: process.env.NODE_ENV === 'production',
      signed: true
    });

    return response.status(201).send({
      result: true,
      message: '로그인 성공',
      loginInfo: { userid, accessToken }
    });
  }
  catch (e) {
    return response.status(202).send({ result: false, message: e });
  }
}

export const logout = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (request.signedCookies['accessToken'] === undefined) {
      throw '로그인된 유저가 아닙니다.';
    }

    const userid = request.signedCookies['accessToken'].userid;
    response.clearCookie('accessToken');

    model.user.deleteRefreshToken(userid);
    return response.send({ result: true });
  }
  catch (e) {
    return response.send({ result: false, message: e });
  }
}

export const isExistUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.query;
    const userInfo: UserRow = await model.user.getUserInfo({
      columns: ['*'],
      id: id as string
    });

    return response.send(userInfo !== undefined);
  }
  catch (e) {
    // 에러(네트워크, 기타) 발생시 유저가 존재한다는 응답을 보냄으로서 회원가입을 막는다.
    return response.send({ result: !USEREXIST, message: e });
  }
}


export const registUser = async (request: Request, response: Response) => {
  const { id, email, pwd } = request.body;
  try {
    // 누가 postman으로 중복아이디를 던진다면 ???
    const userInfo: UserRow = await model.user.getUserInfo({
      columns: ['*'],
      id: id as string
    });

    if (userInfo) {
      throw false;
    }

    const salt = await createSalt();
    const encryptedPassword: string = await getCryptoPassword(pwd, salt);

    await model.user.register(id, encryptedPassword, email);
    await model.user.registSalt(id, salt)
    response.status(201).send(true);
  }
  catch (e) {

    // 소금 등록 실패시 참조무결성을 위해 방금 등록된 아이디를 삭제해야 한다.
    // 사실 이건 일어날 일이 없지 않나? 
    if (e === 'registsalt query fail') {
      await model.user.deleteUser(id)
        .then(res => response.status(400).send({
          result: !ENROLLSUCCESS,
          message: '유저 등록 실패 및 아이디 삭제'
        }))
        .catch(res => response.status(400).send({
          result: !ENROLLSUCCESS,
          message: '유저등록 실패 및 아이디 삭제도 실패'
        }))
    }

    return response.status(202).send({
      result: !ENROLLSUCCESS,
      message: '유저등록 실패'
    });
  }
}

// 새로고침시 자동 로그인
// 토큰 만료시 새로고침할 때에도 유저검증을 해야한다.
export const slientLogin = async (request: Request, response: Response) => {

  try {
    const accessToken = request.signedCookies['accessToken'].accessToken;
    const result = await userVerification(request, response, accessToken);

    const data = request.signedCookies['accessToken'];
    response.status(201).send({ result, data });
  }
  catch (e) {
    response.status(202).send({ result: false, message: e });
  }
}