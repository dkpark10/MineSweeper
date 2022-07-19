import mysql, { RowDataPacket, QueryError } from 'mysql2';
import redis from 'redis'
import Model from './model';

export interface GameRecord {
  id: string;
  record: number;
  success: string;
  level: string;
  date?: string;
  clientAnonymousKey?: string;
};

export interface WinGameSize extends RowDataPacket {
  successGameCount: number;
}

type Levels = "easy" | "normal" | "hard";
type LevelsProps = "GameTotalCount" | "GameWinCount" | "BestRecord";
type AlignmentLevelsProps = `${Levels}${LevelsProps}`;
export type GameRecordType = RowDataPacket & {
  [key in AlignmentLevelsProps]: string | number;
}

export default class GameModel extends Model {
  private readonly table2048 = 'game2048';

  constructor(c: mysql.Connection, r: redis.RedisClient) {
    super(c, r);
  }

  public insertMineSweeperGameLog({ id, record, success, level }: GameRecord): Promise<boolean | QueryError> {
    const query = `INSERT INTO ${level}game (GAMENUM, ID, RECORD, DATE, SUCCESS)
                  VALUES (?,?,?,NOW(),?)`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [null, id, record, success === "success" ? 1 : 0], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    })
  }

  public insert2048GameLog({ id, record }: Partial<GameRecord>): Promise<boolean | QueryError> {
    const query = `INSERT INTO ${this.table2048} (GAMENUM, ID, RECORD, DATE) VALUES (?,?,?,NOW())`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [null, id, record], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    })
  }

  public getGameSize(level: string): Promise<number | QueryError> {
    const query =
      `SELECT COUNT(*) AS successGameCount
    FROM ${level}game 
    WHERE success=? 
    ORDER BY gamenum DESC LIMIT 1`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [1], (err, data: WinGameSize[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0].successGameCount);
        }
      });
    });
  }

  public getMineSweeperLank(level: string, { begin, end }: { [key: string]: number }) {
    const query =
      `SELECT id, record, RANK() over(ORDER BY record) AS 'ranking',
        (SELECT COUNT(*) 
        FROM ${level}game 
        WHERE success=?) AS totalItemCount
      FROM ${level}game
      WHERE success=?
      ORDER BY record
      LIMIT ?,?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [1, 1, begin, end], (err, data) => {
        if (err || !data) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public getAllGameRecord(id: string): Promise<GameRecordType> {
    const levels = ["easy", "normal", "hard"];
    const values = [id, 1, id, 1, id];
    const query =
      `SELECT * FROM 
        ${levels.map((level) => `
          (SELECT COUNT(*) AS ${level}GameTotalCount,
            (SELECT COUNT(success)
              FROM ${level}game
              WHERE id=? AND success=?
            )AS ${level}GameWinCount,
            (SELECT record
              FROM ${level}game
              WHERE id=? and success=?
              ORDER BY record
              LIMIT 1
            )AS ${level}BestRecord
            FROM ${level}game
            WHERE id=?
        ) AS ${level}record,`)
          .join('')}`
        .slice(0, -1);

    return new Promise((resolve, reject) => {
      this.connection.query(query, [...values, ...values, ...values], (err, data: GameRecordType[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
    });
  }

  public getPastGame(id: string): Promise<GameRecord> {
    const query = `
    SELECT record, DATE_FORMAT(DATE, '%Y/%m/%d')AS date ,success,level
      FROM(
      SELECT record,DATE,success, 'easy' AS level FROM easygame WHERE id=? AND success=?
      UNION
      SELECT record,DATE,success, 'normal' FROM normalgame WHERE id=? AND success=?
      UNION
      SELECT record,DATE,success, 'hard' FROM hardgame WHERE id=? AND success=?)AS temp
      ORDER BY DATE DESC
      limit 10`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [id, 1, id, 1, id, 1], (err, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public getUserRankInfoMineSweeper(userid: string, level: string): Promise<GameRecord> {
    const query = `
    SELECT id, record, ranking,
    (SELECT COUNT(*) FROM 
      (SELECT ID FROM ${level}game WHERE id=? AND success=? LIMIT ?)AS a
    ) AS totalItemCount
    FROM (
      SELECT id, record, RANK() over(ORDER BY record) AS 'ranking'
      FROM ${level}game
      WHERE success=?
    )ranked
    WHERE id=?
    LIMIT ?,?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [userid, 1, 20, 1, userid, 0, 20], (err, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public getGame2048Lank({ begin, end }: { [key: string]: number }) {
    const query = `
      SELECT id, record, RANK() over(ORDER BY record) AS 'ranking',
      (SELECT COUNT(*) FROM ${this.table2048}) AS totalItemCount
      FROM ${this.table2048}
      ORDER BY record DESC
      LIMIT ?,?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [begin, end], (err, data) => {
        if (err || !data) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public getUserRankInfo2048(user: string) {
    const query = `
      SELECT id, record, ranking,
      (SELECT COUNT(*) FROM 
        (SELECT ID FROM ${this.table2048} WHERE id=? LIMIT ?)AS a
      ) AS totalItemCount
      FROM (
        SELECT id, record, RANK() over(ORDER BY record) AS 'ranking'
        FROM ${this.table2048}
      )ranked
      WHERE id=?
      LIMIT ?,?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [user, 20, user, 0, 20], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  }
}