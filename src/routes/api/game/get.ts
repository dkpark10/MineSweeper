import { Request, Response, NextFunction } from 'express';
import db, { GameRecord } from '../../../models/db';

const getGameSize = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const level = request.params.level;
    const { page } = request.query;

    if (page !== undefined)
      return next();

    const ret = await db.getGameSize(level);

    if (ret === undefined)
      throw 'no size'

    if (ret === 0)
      return response.status(200).send({ result: true, data: 1 });

    response.status(200).send({ result: true, data: ret });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const getGame = async (request: Request, response: Response) => {

  try {
    const { page } = request.query;
    if (isNaN(Number(page)))
      throw "숫자가 아닙니다.";

    const end = Number(page) * request.app.get('itemCountPerPage');
    const begin = end - request.app.get('itemCountPerPage');

    const ret = await db.getGameLank(request.params.level, { begin, end });

    response.status(200).send({ result: true, data: ret });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

export { getGameSize, getGame };