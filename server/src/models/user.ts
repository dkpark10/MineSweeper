import mysql, { MysqlError } from 'mysql';
import redis from 'redis';
import Model from './model';

export interface UserRow {
  ID: string;
  PWD: string;
  EMAIL: string;
  GRADE: number;
  AUTH: string;
  ENROLLDATE: any;
};

export interface UserInfo {
  id: string;
  pwd: string;
  email: string;
};

export default class UserModel extends Model {

  constructor(c: mysql.Connection, r: redis.RedisClient) {
    super(c, r);
  }

  public register({ id, pwd, email }: UserInfo): Promise<boolean> {

    const query = `INSERT INTO USERS (ID, PWD, EMAIL, GRADE, AUTH, ENROLLDATE)
                            VALUES (?, ?, ?, ?, ?, NOW())`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id, pwd, email, 5, 'normal'], (err, result) => {
        if (err) {
          reject('register user query fail');
        } else {
          resolve(true);
        }
      });
    })
  }

  public registSalt(id: string, salt: string): Promise<boolean> {

    const query = `INSERT INTO SALT (ID, SALT) VALUES (?, ?)`;

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

    const query = 'SELECT SALT FROM SALT WHERE ID = ?';

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id], (err: MysqlError | null, result: { SALT: string }[]) => {
        if (err) {
          reject('getSalt query fail');
        } else {
          resolve(result[0].SALT);
        }
      });
    });
  }

  public getUserInfo({ columns, id }: { columns: string[], id: string }): Promise<UserRow[]> {

    const query: string = `SELECT ${columns} FROM USERS WHERE ID =?`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id], (err: MysqlError | null, result: UserRow[]) => {
        if (err) {
          reject('getUserInfo query fail');
        } else {
          resolve(result);
        }
      });
    })
  }

  public getPassword(id: string): Promise<string> {

    const query: string = `SELECT PWD FROM USERS WHERE ID = ?`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id], (err: MysqlError | null, result: { PWD: string }[]) => {
        if (err) {
          reject('isExistUser query fail');
        } else {
          resolve(result[0].PWD);
        }
      });
    })
  }

  public deleteUser(id: string): Promise<boolean> {

    const query = 'DELETE FROM USERS WHERE id = ?';

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id], (err: MysqlError | null, result) => {
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

  public deleteRefreshToken(id: string) {
    this.redis.del(id);
  }

  public getRefreshToken(id: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.redis.get(id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}