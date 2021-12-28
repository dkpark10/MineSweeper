import mysql, { ConnectionConfig } from 'mysql';
import redis from 'redis';
import config from '../config/Index';
import UserModel from '../models/user';
import PostModel from '../models/post';
import GameModel from '../models/game';

// 싱글톤으로 작성한다.
class Connection {

  private static instance: Connection;
  private readonly connection: mysql.Connection;
  private readonly redis: redis.RedisClient;

  public readonly user: UserModel;
  public readonly game: GameModel;
  public readonly post: PostModel;

  private constructor(config: ConnectionConfig) {

    this.connection = mysql.createConnection(config);
    this.connection.connect();
    this.redis = redis.createClient();

    this.post = new PostModel(this.connection, this.redis);
    this.game = new GameModel(this.connection, this.redis);
    this.user = new UserModel(this.connection, this.redis);
  }

  public static getInstance() {

    if (!Connection.instance) {
      Connection.instance = new Connection(config.mysql);
    }
    return Connection.instance;
  }
}

export default Connection.getInstance();