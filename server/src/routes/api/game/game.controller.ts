import { Request, Response, NextFunction } from 'express';
import model from '../../../models';
import { GameRecord } from '../../../models/game';

const getGameSize = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const level = request.params.level;
    const { page } = request.query;

    if (page !== undefined){
      return next();
    }

    const ret = await model.game.getGameSize(level);

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

    const ret = await model.game.getGameLank(request.params.level, { begin, end });

    response.status(200).send({ result: true, data: ret });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const record = async (request: Request, response: Response) => {

  try {

    const { id, record, success, level } = request.body;
    const gameRecord: GameRecord = {
      id,
      level,
      record: Number(record),
      success: success === 'true' ? 1 : 0,
    }

    await model.game.insertGameRecord(gameRecord);
    response.status(201).send({ result: true, message: '게임 기록 쿼리 성공' });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const getUserGame = async (request: Request, response: Response, next: NextFunction) => {

  try{

    const { userid } = request.query;
    
    const isExistUser = await model.user.getUserInfo({
      columns: ['id'],
      id: userid as string
    });

    if (isExistUser.length <= 0) {
      throw 'no exist user';
    }

    const winRate = await model.game.getUserGame(userid as string);
    const bestRecordPerLevel = await model.game.getBestRecordPerLevel(userid as string);
    const pastGame = await model.game.getPastGame(userid as string);
    const data = { ...winRate, ...bestRecordPerLevel, pastGame: pastGame };

    response.status(201).send({ result: true, data });

  }catch(e){
    response.status(201).send({ result: true, message: e});
  }
}

export { record, getGameSize, getGame, getUserGame };
