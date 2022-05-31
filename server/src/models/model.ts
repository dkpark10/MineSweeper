import mysql from 'mysql2';
import redis from 'redis';

export default abstract class Model {

  protected readonly connection: mysql.Connection;
  protected readonly redis: redis.RedisClient;

  constructor(c: mysql.Connection, r: redis.RedisClient) {
    this.connection = c;
    this.redis = r;
  }

  public deleteRedisValue(key: string) {
    this.redis.del(key);
  }

  public setRedisValue(key: string, value: string) {
    this.redis.set(key, value);
  }

  public getRedisValue(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.redis.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}