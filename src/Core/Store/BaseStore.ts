import Redis = require('ioredis');

export abstract class BaseStore<K, V> {
    protected cache: Map<K, V> = new Map();
    protected cacheSize: number;
    protected prefix: string;
    protected redis: Redis.Redis;

    public constructor(cacheSize: number, prefix: string, redis: Redis.Redis) {
        this.cacheSize = cacheSize;
        this.prefix = prefix;
        this.redis = redis;
    }

    public async get(id: K): Promise<V | null> {
        const item = this.cache.get(id);

        if (item) {
            return item;
        }

        const retrievedItem = await this.redis.get(`${this.prefix}:${id}`);

        if (!retrievedItem) {
            return null;
        }

        const deserialized = JSON.parse(retrievedItem);

        if (this.cache.size >= this.cacheSize) {
            this.evictRandom();
        }

        this.cache.set(id, deserialized);

        return deserialized;
    }

    protected evictRandom() {
        const keys = Array.from(this.cache.keys());
        const key = keys[keys.length * Math.random() << 0];

        this.cache.delete(key);
    }
}
