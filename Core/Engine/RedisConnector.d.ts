/// <reference types="ioredis" />
import Redis = require("ioredis");
export default class RedisConnector {
    config: Redis.RedisOptions;
    constructor(config: Redis.RedisOptions);
    createConnection(): Redis.Redis;
}
