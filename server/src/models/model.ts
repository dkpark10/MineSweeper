import mysql from 'mysql2';
import redis from 'redis';

export default abstract class Model {

  protected readonly connection: mysql.Connection;
  protected readonly redis: redis.RedisClient;

  constructor(c: mysql.Connection, r: redis.RedisClient) {
    this.connection = c;
    this.redis = r;
  }

  public deleteRedisValue(id: string) {
    this.redis.del(id);
  }

  public setRedisValue(ip: string, id: string) {
    this.redis.set(ip, id);
  }

  public getRedisValue(id: string): Promise<string | null> {
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