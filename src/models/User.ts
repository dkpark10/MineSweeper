import mysql, { ConnectionConfig, MysqlError } from 'mysql';
import config from '../config/index';
import encrypter from '../util/Crypto';

interface UserRow {
  ID: string;
  PWD: string;
  EMAIL: string;
  GRADE: number;
  AUTH: string;
  ENROLLDATE: any;
};

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

  public register(id: string, pwd: string, salt: string) {

    const query: string = 'INSERT INTO USERS SET ?';
    const user = {

    }

    this.connection.query(query, user, (err, result) => {

    });
  }

  public isExistUser(id: string): Promise<boolean> {

    const query: string = 'SELECT ID FROM USERS WHERE ID = ?';

    return new Promise((reslove, reject) => {
      this.connection.query(query, [id], (err: MysqlError | null, result: UserRow[]) => {
        if (err) {
          reject('isExistUser query fail');
        } else {
          reslove(result.length > 0);
        }
      });
    })
  }
}

export default Connection.getInstance();