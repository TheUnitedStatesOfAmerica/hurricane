"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
class RedisConnector {
    constructor(config) {
        this.config = config;
    }
    createConnection() {
        return new Redis(this.config);
    }
}
exports.default = RedisConnector;
//# sourceMappingURL=RedisConnector.js.map