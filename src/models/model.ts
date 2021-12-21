import mysql from 'mysql';
import redis from 'redis';

export default abstract class Model {

  protected readonly connection: mysql.Connection;
  protected readonly redis: redis.RedisClient;

  constructor(c: mysql.Connection, r: redis.RedisClient) {
    this.connection = c;
    this.redis = r;
  }
}