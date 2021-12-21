import { Request, Response, NextFunction } from 'express';
import Encrypter from '../../../util/crypto';
import sanitize from 'sanitize-html';
import model from '../../../models/index';
import { UserRow } from '../../../models/user';
import { signToken } from '../../../util/jwttHandler';
import getUser from '../../../middlewares/getUser';

const getSaltedPassword = async (id: string, pwd: string) => {
  const encrypter: Encrypter = new Encrypter();
  const salt: string = await model.user.getSalt(id);

  return await encrypter.getCryptoPassword(salt, pwd);
}

const USEREXIST = true as const;
const ENROLLSUCCESS = true as const;

const sanitizeOption = {
  allowedTags: [],
}

const login = async (request: Request, response: Response, next: NextFunction) => {

  try {
    const { id, pwd } = request.body;
    const jwtSecretKey = request.app.get('secret-key').jwtKey;

    const userInfo: UserRow[] = await model.user.getUserInfo({
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

    model.user.setRefreshToken(id, refreshToken);

    response.cookie('accessToken', { id, accessToken }, {
      httpOnly: process.env.NODE_ENV === 'production',
      signed: true
    });

    return response.status(201).send({
      result: true, message: '로그인 성공', loginInfo: { id, accessToken }
    });
  }
  catch (e) {
    return response.status(202).send({ result: false, message: e });
  }
}

const logout = async (request: Request, response: Response, next: NextFunction) => {

  try {
    
    if (request.signedCookies['accessToken'] === undefined){
      throw '쿠키 없음 ~~~';
    }

    const id = request.signedCookies['accessToken'].id;
    response.clearCookie('accessToken');
    
    model.user.deleteRefreshToken(id);
    return response.status(200).send({ result: true, message: 'Logout ~~' });
  }
  catch (e) {
    return response.status(202).send({ result: false, message: e });
  }
}

const isExistUser = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const key: string = sanitize(Object.keys(request.query)[0], sanitizeOption).toUpperCase();
    const value: string = sanitize(Object.values(request.query)[0] as string, sanitizeOption);

    if (value === '' || !value) {
      throw "누가 스크립트 태그를 넣어 공격했군....";
    }

    const user = await getUser(key, value);

    return response.status(200).send({
      result: user,
      message: '유저 존재 쿼리 성공~~'
    });
  }
  catch (e) {
    // 에러(네트워크, 기타) 발생시 유저가 존재한다는 응답을 보냄으로서 회원가입을 막는다.
    return response.status(400).send({ result: !USEREXIST, message: e });
  }
}


const registUser = async (request: Request, response: Response, next: NextFunction) => {

  const { id, email, pwd } = request.body;

  try {
    // 누가 postman으로 중복아이디, 중복메일로 던진다면 ??
    const existid = await getUser('id', id);
    const existMail = await getUser('email', email);

    if (existid || existMail)
      throw false;

    const encrypter: Encrypter = new Encrypter();
    const salt: string = await encrypter.createSalt();
    const encryptedPassword: string = await encrypter.getCryptoPassword(salt, pwd);

    return await model.user.register({ id, pwd: encryptedPassword, email })
      .then(_ => model.user.registSalt(id, salt))
      .then(res => response.status(201).send({
        result: ENROLLSUCCESS,
        message: '유저 등록 성공 환영해요 ~~'
      }));
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

const test = async (request: Request, response: Response, next: NextFunction) => {

  try {
    response.status(200).send('로그인 유효하냐???');
  }
  catch (e) {

  }
}

export { isExistUser, registUser, test ,login, logout };