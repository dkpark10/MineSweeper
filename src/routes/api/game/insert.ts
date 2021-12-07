import { Request, Response, NextFunction } from 'express';
import db, { GameRecord } from '../../../models/db';
import shortid from 'shortid';

const record = async (request: Request, response: Response) => {

  try {

    const { id, record, success, level } = request.body;
    const gameRecord: GameRecord = {
      id,
      level,
      record: Number(record),
      success: success === 'true' ? 1 : 0,
    }

    await db.insertGameRecord(gameRecord);
    response.status(201).send({ result: true, message: '게임 기록 쿼리 성공' });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const insertTest = async (request: Request, response: Response) => {

  try {

    for (let i = 0; i < 5000; i++) {

      const record = Math.round(Math.random() * (999999 - 1) + 1) / 1000;
      const success = Math.floor(Math.random() * 10) % 2;

      const gameRecord: GameRecord = {
        id: shortid.generate(),
        level: 'test',
        record,
        success
      }

      await db.insertGameRecord(gameRecord);
    }

    response.status(201).send({ result: true, message: '게임 기록 쿼리 성공' });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const getTest = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const begin = new Date().getTime();
    const data = await db.getGameRecord();
    const end = new Date().getTime();

    response.status(201).send({ result: true, message: (end - begin) / 1000, length: data.length });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

export { record, insertTest, getTest };