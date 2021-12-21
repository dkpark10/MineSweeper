import mysql from 'mysql';
import redis from 'redis'
import Model from './model';

export interface GameRecord {
  id: string;
  record: number;
  success: number;
  level: string;
};

export interface WinRate {
  easywin: number;
  easytotal: number;
  normalwin: number;
  normaltotal: number;
  hardwin: number;
  hardtotal: number;
};

export interface BestRecord {
  ebest: number;
  nbest: number;
  hbest: number;
};


export default class GameModel extends Model {

  constructor(c: mysql.Connection, r: redis.RedisClient) {
    super(c, r);
  }

  public insertGameRecord({ id, record, success, level }: GameRecord): Promise<boolean | string> {

    const query = `INSERT INTO ${level}game (GAMENUM, ID, RECORD, DATE, SUCCESS)
                  VALUES (?,?,?,NOW(),?)`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [null, id, record, success], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    })
  }

  public getGameRecord(): Promise<any[]> {

    const query = 'SELECT* FROM EASYGAME ORDER BY RECORD';

    return new Promise((resolve, reject) => {

      this.connection.query(query, [], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public getGameSize(level: string): Promise<number> {

    const query =
      `SELECT COUNT(*) AS successGameCount
    FROM ${level}game 
    WHERE success=? 
    ORDER BY gamenum DESC LIMIT 1`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [1], (err, data: { successGameCount: number }[]) => {

        if (err) {
          reject(err);
        } else {
          resolve(data[0].successGameCount);
        }
      });
    });
  }

  public getGameLank(level: string, { begin, end }: { [key: string]: number }) {

    const query =
      `SELECT id, MIN(record) as record, ranking
        FROM (
          SELECT id, record, RANK() over(ORDER BY record) AS 'ranking'
          FROM ${level}game
          WHERE success=?
        )ranked
        WHERE ranked.ranking >? AND ranked.ranking <=?
        GROUP BY id`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [1, begin, end], (err, data) => {
        if (err || !data) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public getUserGame(id: string): Promise<WinRate> {

    const level = ['easy', 'normal', 'hard'];
    const query =
      `SELECT *
      FROM 
      (SELECT COUNT(*) AS ${level[0]}total,
        (SELECT COUNT(success)
        FROM easygame
        WHERE id=? AND success=?
        )AS ${level[0]}win
        FROM easygame
        WHERE id=?) AS easy,

      (SELECT COUNT(*) AS ${level[1]}total,
        (SELECT COUNT(success) 
        FROM normalgame
        WHERE id=? AND success=?
        )AS ${level[1]}win
        FROM normalgame
        WHERE id=?) AS normal,

      (SELECT COUNT(*) AS ${level[2]}total,
        (SELECT COUNT(success) 
        FROM hardgame
        WHERE id=? AND success=?
        )AS ${level[2]}win
        FROM hardgame
        WHERE id=?) AS hard
    `;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id, 1, id, id, 1, id, id, 1, id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
    });
  }

  public getBestRecordPerLevel(id: string):Promise<BestRecord> {

    const query =
      `SELECT MIN(e.record)as ebest, MIN(n.record)as nbest, MIN(h.record) as hbest
      FROM (
        SELECT record, RANK() over(ORDER BY record)
        FROM easygame
        WHERE id=? and success=?
      )as e,
      (
        SELECT record, RANK() over(ORDER BY record)
        FROM normalgame
        WHERE id=? and success=?
      )as n,
      (
        SELECT record, RANK() over(ORDER BY record)
        FROM hardgame
        WHERE id=? and success=?
      )as h`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id, 1, id, 1, id, 1], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
    });
  }
}