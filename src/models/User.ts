import mysql, { ConnectionConfig, MysqlError } from 'mysql';
import config from '../config/Index';
import { resolve } from 'path';

interface UserRow {
  ID: string;
  PWD: string;
  EMAIL: string;
  GRADE: number;
  AUTH: string;
  ENROLLDATE: any;
};

interface UserInfo {
  id: string;
  pwd: string;
  email: string;
};

// 싱글톤으로 작성한다.
class Connection {

  private static instance: Connection;
  private readonly connection: mysql.Connection;

  private constructor(config: ConnectionConfig) {

    this.connection = mysql.createConnection(config);
    this.connection.connect();
  }

  public static getInstance() {

    if (!Connection.instance) {
      Connection.instance = new Connection(config.mysql);
    }
    return Connection.instance;
  }

  public verify(id: string, pwd: string) {

    const query: string = 'SELECT * FROM USER WHERE ID=? AND PWD=?';

    this.connection.query(query, [id, pwd], (err: MysqlError | null, result: any) => {
      if (err) {
        throw new Error('verify query fail');
      } else {
        // ???
      }
    })
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

  public isExistUser({ column, value }: any): Promise<boolean> {

    const query: string = `SELECT ID FROM USERS WHERE ${column} = ?`;

    return new Promise((resolve, reject) => {

      this.connection.query(query, [value], (err: MysqlError | null, result: UserRow[]) => {
        if (err) {
          reject('isExistUser query fail');
        } else {
          resolve(result.length > 0);
        }
      });
    })
  }

  public deleteUser(id: string): Promise<boolean> {

    const query = 'DELETE FROM USERS WHERE id = ?';

    return new Promise((resolve, reject) => {

      this.connection.query(query, [id], (err: MysqlError | null, result: UserRow[]) => {
        if (err) {
          reject('delete user query fail');
        } else {
          resolve(true);
        }
      });
    })
  }
}

export default Connection.getInstance();