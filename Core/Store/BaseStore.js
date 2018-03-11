"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseStore {
    constructor(cacheSize, prefix, redis) {
        this.cache = new Map();
        this.cacheSize = cacheSize;
        this.prefix = prefix;
        this.redis = redis;
    }
    async get(id) {
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
    evictRandom() {
        const keys = Array.from(this.cache.keys());
        const key = keys[keys.length * Math.random() << 0];
        this.cache.delete(key);
    }
}
exports.BaseStore = BaseStore;
//# sourceMappingURL=BaseStore.js.map