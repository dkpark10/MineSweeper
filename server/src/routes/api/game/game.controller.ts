import requestIp from "request-ip";
import shortid from "shortid";
import model from '../../../models';
import { Request, Response, NextFunction } from 'express';
import { GameRecord } from '../../../models/game';

export const getGameSize = async (request: Request, response: Response, next: NextFunction) => {
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

export const getGameInfo = async (request: Request, response: Response) => {

  try {
    const { page } = request.query;
    if (isNaN(Number(page)))
      throw "숫자가 아닙니다.";

    const end = Number(page) * request.app.get('itemCountPerPage');
    const begin = end - request.app.get('itemCountPerPage');
    const data = await model.game.getGameLank(request.params.level, { begin, end });

    response.status(200).send(data);
  }
  catch (e) {
    response.status(202).send([]);
  }
}

export const record = async (request: Request, response: Response) => {
  try {
    const { id, record, success, level } = request.body;
    let userid: string = id;

    if (id === "anonymous") {
      const clientIp = requestIp.getClientIp(request); 
      const anonymousId = await model.user.getAnonymousUserId(clientIp);
      console.log(clientIp, anonymousId);
      userid = anonymousId ? anonymousId.ID : `anonymous${shortid.generate()}`;
    }

    console.log(userid);
    const gameRecord: GameRecord = {
      level,
      id: userid,
      record: Number(record),
      success: success === "true" ? 1 : 0,
    }

    const result = await model.game.insertGameRecord(gameRecord);
    response.status(201).send(result)
  }
  catch (e) {
    response.status(202).send(false);
  }
}

export const getUserGame = async (request: Request, response: Response) => {
  try{
    const { userid } = request.query;
    
    const isExistUser = await model.user.getUserInfo({
      columns: ["id"],
      id: userid as string
    });

    if (!isExistUser || userid === "anonymous") {
      throw 'no exist user';
    }

    const allGameRecord = await model.game.getAllGameRecord(userid as string);
    const pastGame = await model.game.getPastGame(userid as string);
    const data = { ...allGameRecord , pastGame };
    response.status(200).send(data);

  }catch(e){
    response.status(202).send({ result: true, message: e});
  }
}