import mysql, { QueryError, RowDataPacket } from 'mysql2';
import redis from 'redis';
import Model from './model';

export interface UserRow extends RowDataPacket {
  ID: string;
  PWD: string;
  EMAIL: string;
  GRADE: number;
  AUTH: string;
  ENROLLDATE: any;
};

export interface InputUserData {
  id: string;
  password: string;
  email: string
}

export default class UserModel extends Model {

  private readonly table = 'users';
  constructor(c: mysql.Connection, r: redis.RedisClient) {
    super(c, r);
  }

  public register({ id, password, email }: InputUserData): Promise<boolean> {
    const query = `INSERT INTO ${this.table} (ID, PWD, EMAIL, GRADE, AUTH, ENROLLDATE)
                            VALUES (?, ?, ?, ?, ?, NOW())`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [id, password, email, 5, 'normal'], (err, result) => {
        if (err) {
          reject('register user query fail');
        } else {
          resolve(true);
        }
      });
    })
  }

  public registSalt(id: string, salt: string): Promise<boolean> {
    const query = `INSERT INTO salt (ID, SALT) VALUES (?, ?)`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [id, salt], (err, result) => {
        if (err) {
          reject('registsalt query fail');
        } else {
          resolve(true);
        }
      });
    })
  }

  public getSalt(id: string): Promise<string> {
    const query = 'SELECT salt FROM salt WHERE ID = ?';

    return new Promise((resolve, reject) => {
      this.connection.query(query, [id], (err: QueryError | null, result: any[]) => {
        if (err) {
          reject('getSalt query fail');
        } else {
          resolve(result[0].salt);
        }
      });
    });
  }

  public getUserInfo({ columns, id }: { columns: string[], id: string }): Promise<UserRow> {
    const query: string = `SELECT ${columns} FROM ${this.table} WHERE ID =?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [id], (err: QueryError | null, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    })
  }

  public getAnonymousUserId(ip: string | null): Promise<string> {
    const query = `SELECT ID FROM ${this.table} WHERE IP=?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [ip], (err: QueryError | null, result: UserRow[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].ID);
        }
      });
    })
  }

  public deleteUser(id: string): Promise<boolean> {
    const query = `DELETE FROM ${this.table} WHERE id=?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [id], (err: QueryError | null, result) => {
        if (err) {
          reject('delete user query fail');
        } else {
          resolve(true);
        }
      });
    })
  }

  public setRefreshToken(id: string, refreshToken: string) {
    this.redis.set(id, refreshToken);
    // 2주뒤 refresh token 삭제 
    this.redis.expire(id, (86400 * 14));
  }
}