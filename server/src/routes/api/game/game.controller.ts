import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';
import shortid from 'shortid';
import model from '../../../models';
import { GameRecord } from '../../../models/game';

export const getMineSweeperRankData = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { page, level, user } = request.query;
    if (user) {
      return next();
    }

    if (isNaN(Number(page)))
      throw '숫자가 아닙니다.';

    const end = Number(page) * request.app.get('itemCountPerPage');
    const begin = end - request.app.get('itemCountPerPage');
    const data = await model.game.getMineSweeperLank(level as string, { begin, end });

    response.status(200).send(data);
  }
  catch (e) {
    response.status(202).send([]);
  }
}

export const getUserSearchMineSweeper = async (request: Request, response: Response) => {
  try {
    const { user, level } = request.query;
    const data = await model.game.getUserRankInfoMineSweeper(user as string, level as string);
    response.status(200).send(data);
  } catch (e) {
    response.status(201).send(e);
  }
}

export const recordAnonymousGame = async (request: Request<{}, {}, GameRecord>, response: Response, next: NextFunction) => {
  try {
    const { id, record, success, level, clientAnonymousKey } = request.body;
    const anonymousKey = request.app.get('secret-key').anonymousKey;

    if (id !== 'anonymous') {
      return next();
    }

    if (clientAnonymousKey !== anonymousKey) {
      throw '유요하지 않은 요청입니다';
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

    const result = await model.game.insertMineSweeperGameLog(gameRecord);
    response.status(201).send(result)
  }
  catch (e) {
    response.status(202).send(e);
  }
}

export const recordAnonymousGame2048 = async (request: Request<{}, {}, GameRecord>, response: Response, next: NextFunction) => {
  try {
    const { id, record, clientAnonymousKey } = request.body;
    const anonymousKey = request.app.get('secret-key').anonymousKey;

    if (id !== 'anonymous') {
      return next();
    }

    if (clientAnonymousKey !== anonymousKey) {
      throw '유요하지 않은 요청입니다';
    }

    const clientIp = requestIp.getClientIp(request) as string;
    let anonymousId = await model.user.getRedisValue(clientIp);

    if (anonymousId === null) {
      anonymousId = `익명_${shortid.generate()}`;
      model.user.setRedisValue(clientIp, anonymousId);
    }

    const gameRecord: Partial<GameRecord> = {
      id: anonymousId as string,
      record: Number(record),
    }

    const result = await model.game.insert2048GameLog(gameRecord);
    response.status(201).send(result)
  } catch (e) {
    response.status(202).send(e);
  }
}

export const record2048GameLog = async (request: Request, response: Response) => {
  try {
    const { id, record } = request.body;

    const gameRecord = {
      id,
      record: Number(record),
    }

    const result = await model.game.insert2048GameLog(gameRecord);
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

    const result = await model.game.insertMineSweeperGameLog(gameRecord);
    response.status(201).send(result)
  }
  catch (e) {
    response.status(202).send(false);
  }
}

export const getUserGameData = async (request: Request, response: Response) => {
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

export const get2048RankData = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { page, user } = request.query;

    if (user) {
      return next();
    }

    if (isNaN(Number(page))){
      throw '숫자가 아닙니다.';
    }

    const end = Number(page) * request.app.get('itemCountPerPage');
    const begin = end - request.app.get('itemCountPerPage');
    const data = await model.game.getGame2048Lank({ begin, end });

    response.status(200).send(data);
  }
  catch (e) {
    response.status(202).send(e);
  }
}

export const getUserSearch2048 = async (request: Request, response: Response) => {
  try {
    const { user } = request.query;
    const data = await model.game.getUserRankInfo2048(user as string);
    response.status(200).send(data);
  } catch (e) {
    response.status(201).send(e);
  }
}