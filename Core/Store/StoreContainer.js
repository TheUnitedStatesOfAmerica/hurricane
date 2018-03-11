"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChannelStore_1 = require("./ChannelStore");
class StoreContainer {
    constructor(redis) {
        this._channels = new ChannelStore_1.default(redis, 500);
    }
    get channels() {
        return this._channels;
    }
}
exports.default = StoreContainer;
//# sourceMappingURL=StoreContainer.js.map