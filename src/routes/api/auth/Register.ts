import { Request, Response, NextFunction } from 'express';
import sanitize from 'sanitize-html';
import db from '../../../models/User';

const isExistid = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const id: string = sanitize(request.body.id);
    const isExistUser: boolean = await db.isExistUser(id);

    // 유저가 존재하지 않는다면
    if (isExistUser === false) {
      next();
    } else {
      throw new Error('user is already exist');
    }
  }
  catch (e) {
    response.send(e);
  }
}

const register = async (request: Request, response: Response, next: NextFunction) => {


}

export { isExistid, register };