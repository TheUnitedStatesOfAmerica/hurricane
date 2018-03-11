/// <reference types="ioredis" />
import Redis = require('ioredis');
export declare abstract class BaseStore<K, V> {
    protected cache: Map<K, V>;
    protected cacheSize: number;
    protected prefix: string;
    protected redis: Redis.Redis;
    constructor(cacheSize: number, prefix: string, redis: Redis.Redis);
    get(id: K): Promise<V | null>;
    protected evictRandom(): void;
}
