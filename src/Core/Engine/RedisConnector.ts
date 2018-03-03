import Redis = require("ioredis");

export default class RedisConnector {
    public config: Redis.RedisOptions;

    constructor(config: Redis.RedisOptions) {
        this.config = config;
    }

    public createConnection(): Redis.Redis {
        return new Redis(this.config);
    }
}
