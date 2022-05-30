import mysql from 'mysql2';
import redis from 'redis'
import Model from './model';

export interface PostArg {
  author: string;
  title: string;
  contents: string;
}

export interface PostResponse {
  id: string;
  author: string;
  title: string;
  comment: string;
  likenum: string;
  time: number;
  views: number;
  totalSize: number;
}

export default class PostModel extends Model {

  private readonly table = 'posts';
  constructor(c: mysql.Connection, r: redis.RedisClient) {
    super(c, r);
  }

  public getPostList(begin: number, itemCountPerPage: number): Promise<PostResponse[]> {
    const query =
      `SELECT id, author, title, comments, likenum, UNIX_TIMESTAMP(date)as time,
      (SELECT COUNT(*) FROM posts) AS totalItemCount
      FROM ${this.table} LIMIT ?,?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [begin, itemCountPerPage], (err, data: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public updatePost(postid: string, column: string): Promise<boolean> {
    const query = `UPDATE ${this.table} SET ${column}=${column}+1 WHERE id=?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [postid], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    })
  }

  public getPost(postid: string): Promise<PostResponse> {
    const query =
      `SELECT id, author, content, title, comments, likenum, UNIX_TIMESTAMP(date)as time, views
    FROM ${this.table} WHERE ID=?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [postid], (err, data: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
    });
  }

  // COUNT(*) 가 COUNT(COLUMN)보다 빠르다.
  public getTotalPostSize(): Promise<number> {
    const query = `SELECT COUNT(*) AS totalSize FROM ${this.table}`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [], (err, data: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0].totalSize);
        }
      });
    });
  }

  public insertPost({ author, title, contents }: PostArg): Promise<boolean> {
    const query =
      `INSERT INTO ${this.table} (ID, AUTHOR, TITLE, CONTENT, DATE)
    VALUES (?,?,?,?,NOW())`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [null, author, title, contents], (err, data) => {
        if (err || !data) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public deletePost(postid: string): Promise<boolean> {
    const query = `DELETE FROM ${this.table} WHERE ID=?`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, [postid], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public xssTest(drop: string) {
    const query = `SELECT* FROM ${this.table} WHERE ID=${drop}`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}