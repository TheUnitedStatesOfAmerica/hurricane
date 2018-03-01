import { RedisOptions, Redis } from "ioredis";

export default class RedisConnector {
    public config: RedisOptions;

    constructor(config: RedisOptions) {
        this.config = config;
    }

    public createConnection(): Redis {
        return new Redis(this.config);
    }
}