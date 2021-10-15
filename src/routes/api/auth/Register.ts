import { Request, Response, NextFunction, response } from 'express';
import sanitize from 'sanitize-html';
import Encrypter from '../../../util/Crypto';
import db from '../../../models/User';
import { enc } from 'crypto-js';

const sanitizeOption = {
  allowedTags: [],
}

const USEREXIST = true as const;
const ENROLLSUCCESS = true as const;

const isExistUser = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const column: string = sanitize(Object.keys(request.query)[0], sanitizeOption);
    const value: string = sanitize(Object.values(request.query)[0] as string, sanitizeOption);

    if (value === '' || !value) {
      throw new Error('누가 스크립트 태그를 넣어 공격했군....');
    }

    const result: boolean = await db.isExistUser({ column: column, value: value });

    return response.status(200).send({
      result: USEREXIST === result,
      message: '유저 존재 쿼리 성공~~'
    });
  }
  catch (e) {

    // 에러(네트워크, 기타) 발생시 유저가 존재한다는 응답을 보냄으로서 회원가입을 막는다.
    return response.status(200).send({ result: !USEREXIST, message: e });
  }
}


const register = async (request: Request, response: Response, next: NextFunction) => {

  const dirtyUserBeRegistered = request.body as string[];
  const [id, email, passWord] = dirtyUserBeRegistered
    .map((ele: string) => sanitize(ele, sanitizeOption));

  try {

    const encrypter: Encrypter = new Encrypter();
    const salt: string = await encrypter.createSalt();
    const encryptedPassword: string = await encrypter.getCryptoPassword(salt, passWord);

    await db.register({ id, pwd: encryptedPassword, email })DIR
      .then(_ => db.registSalt(id, salt))
      .then(res => response.status(201).send({ result: ENROLLSUCCESS, message: '유저 등록 성공 환영해요 ~~' }));
  }
  catch (e) {

    // 소금 등록 실패시 참조무결성을 위해 방금 등록된 아이디를 삭제해야 한다.
    if (e === 'registsalt query fail') {
      await db.deleteUser(id)
        .then(res => response.status(202).send({ result: !ENROLLSUCCESS, message: '유저 등록 실패 및 아이디 삭제' }))
        .catch(res => response.status(202).send({ result: !ENROLLSUCCESS, message: '유저등록 실패 및 아이디 삭제도 실패' }))
    }

    return response.status(202).send({ result: !ENROLLSUCCESS, message: '유저등록 실패' });
  }
}

const testcheck = async (request: Request, response: Response, next: NextFunction) => {

  try {
    const plain = 'zkzk1166591864';
    const salt = 'L27FsOICMCfXB837wlSgsL4ImhnZJ99Q2U7Vd9Pj5Y2/bMkATIvAdFwe7tQFk9cn385/ugRYlUeTEUfsNFliqg==';
    const pwd = 'DVqY4Kc/zSlhpfoF2b558s/mzomYi7mGLMOiVqCH4lBWIogXi9czmRbB1mJACFPy7h29bmtnglYjkXkcZSOg7w==';

    const encrypter: Encrypter = new Encrypter();
    const encryptedPassword: string = await encrypter.getCryptoPassword(salt, plain);
    console.log(encryptedPassword);

    if (pwd === encryptedPassword) {
      response.status(200).send('same');
    } else {
      response.status(200).send('false');
    }
  }
  catch (e) {

  }
}

export { isExistUser, register, testcheck };