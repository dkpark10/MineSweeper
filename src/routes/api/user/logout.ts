import { Request, Response, NextFunction } from 'express';
import db from '../../../models/db';

const logout = async (request: Request, response: Response, next: NextFunction) => {

  try {
    
    if (request.signedCookies['accessToken'] === undefined){
      throw '쿠키 없음 ~~~';
    }

    const id = request.signedCookies['accessToken'].id;
    response.clearCookie('accessToken');
    
    db.deleteRefreshToken(id);
    return response.status(200).send({ result: true, message: 'Logout ~~' });
  }
  catch (e) {
    return response.status(202).send({ result: false, message: e });
  }
}

export { logout };
