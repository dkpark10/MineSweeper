import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';
import shortid from 'shortid';
import model from '../../../models';
import { createSalt, getCryptoPassword } from '../../../util/crypto';
import { GameRecord } from '../../../models/game';

export const getGameInfo = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { page, user } = request.query;
    if (user) {
      return next();
    }

    if (isNaN(Number(page)))
      throw '숫자가 아닙니다.';

    const end = Number(page) * request.app.get('itemCountPerPage');
    const begin = end - request.app.get('itemCountPerPage');
    const data = await model.game.getGameLank(request.params.level, { begin, end });

    response.status(200).send(data);
  }
  catch (e) {
    response.status(202).send([]);
  }
}

export const getUserGameSearch = async (request: Request, response: Response) => {
  try {
    const level = request.params.level;
    const { user } = request.query;
    const data = await model.game.getUserRankInfo(user as string, level);
    response.status(200).send(data);
  } catch (e) {
    response.status(201).send(e);
  }
}

export const recordAnonymousGame = async (request: Request<{}, {}, GameRecord>, response: Response, next: NextFunction) => {
  try {
    const { id, record, success, level, clientAnonymousKey } = request.body;
    const anonymousKey = request.app.get('secret-key').anonymousKey;

    if (clientAnonymousKey !== anonymousKey) {
      throw '유요하지 않은 요청입니다';
    }

    if (id !== 'anonymous') {
      return next();
    }

    const clientIp = requestIp.getClientIp(request) as string;
    let anonymousId = await model.user.getRedisValue(clientIp);

    if (anonymousId === null) {
      anonymousId = `익명_${shortid.generate()}`;
      model.user.setRedisValue(clientIp, anonymousId);
    }

    const gameRecord: GameRecord = {
      id: anonymousId as string,
      level,
      record: Number(record),
      success: success
    }

    const result = await model.game.insertGameRecord(gameRecord);
    response.status(201).send(result)
  }
  catch (e) {
    response.status(202).send(e);
  }
}

export const recordUserGame = async (request: Request<{}, {}, GameRecord>, response: Response) => {
  try {
    const { id, record, success, level } = request.body;
    const gameRecord: GameRecord = {
      level,
      id,
      record: Number(record),
      success: success
    }

    const result = await model.game.insertGameRecord(gameRecord);
    response.status(201).send(result)
  }
  catch (e) {
    response.status(202).send(false);
  }
}

export const getUserGame = async (request: Request, response: Response) => {
  try {
    const { userid } = request.query;

    const allGameRecord = await model.game.getAllGameRecord(userid as string);
    const pastGame = await model.game.getPastGame(userid as string);
    const data = { ...allGameRecord, pastGame };
    response.status(200).send(data);

  } catch (e) {
    response.status(202).send({ result: true, message: e });
  }
}