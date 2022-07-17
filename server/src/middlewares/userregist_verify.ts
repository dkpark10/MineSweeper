import { Request, Response, NextFunction } from 'express';

interface InputUserData {
  id: string;
  password: string;
  email: string
}

export default async function userRegistVerify(
  request: Request<{}, {}, InputUserData>,
  response: Response,
  next: NextFunction) {

  const idReg = /^[A-za-z0-9]{5,15}$/g;
  const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passwordReg = /^[A-Za-z0-9]{6,15}$/;

  const { id, email, password } = request.body;

  if (idReg.exec(id) === null
    || emailReg.exec(email) === null
    || passwordReg.exec(password) === null) {
    return response.send('유효하지 않은 입력입니다.');
  }

  return next();
}
