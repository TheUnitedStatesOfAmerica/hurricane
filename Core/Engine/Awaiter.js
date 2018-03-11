"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collector_1 = require("../../Structures/Collector");
class Awaiter {
    constructor() {
        this.collectors = new Map();
        this.collectorLimit = 2;
    }
    addCollector(options) {
        let collectors = this.collectors.get(options.channelId);
        if (!collectors) {
            collectors = [];
        }
        if (collectors && collectors.length > this.collectorLimit) {
            throw new Error('Hitting collector per channel limit');
        }
        const collector = new Collector_1.default({ channelId: options.channelId.value }, this);
        collectors.push(collector);
        this.collectors.set(options.channelId, collectors);
        return collector;
    }
    invokeAllCollectors(message) {
        const collectors = this.collectors.get(message.channelId);
        if (!collectors)
            return false;
        return collectors.map(c => c.check(message));
    }
    shutdown() {
        return this.collectors.clear();
    }
}
exports.default = Awaiter;
//# sourceMappingURL=Awaiter.js.map