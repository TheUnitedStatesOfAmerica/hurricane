"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStore_1 = require("./BaseStore");
class ChannelStore extends BaseStore_1.BaseStore {
    constructor(redis, cacheSize = 0) {
        super(cacheSize, 'channels', redis);
    }
}
exports.default = ChannelStore;
//# sourceMappingURL=ChannelStore.js.map