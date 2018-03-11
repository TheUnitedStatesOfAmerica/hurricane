"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = require("eventemitter3");
var CollectorEvent;
(function (CollectorEvent) {
    CollectorEvent["End"] = "COLLECTOR_END";
    CollectorEvent["Message"] = "COLLECTOR_MESSAGE";
})(CollectorEvent = exports.CollectorEvent || (exports.CollectorEvent = {}));
class Collector extends eventemitter3_1.EventEmitter {
    constructor(options, awaiter) {
        super();
        this.stopped = false;
        this.channelId = options.channelId;
        this.awaiter = awaiter;
        this.timeout = setTimeout(() => {
            this.emit(CollectorEvent.End);
            this.stopped = true;
        }, options.timeout || 10000);
    }
    await(amount, filter, timeout) {
        return new Promise((resolve, reject) => {
            const messages = new Map();
            this.on(CollectorEvent.Message, (receivedMessage) => {
                if (filter && !filter(receivedMessage)) {
                    return;
                }
                messages.set(receivedMessage.id, receivedMessage);
                if (messages.size >= amount) {
                    resolve(messages);
                }
            });
            this.on(CollectorEvent.End, () => {
                reject(new Error(`Collector for ${this.channelId} timed out`));
            });
            if (timeout) {
                setTimeout(() => {
                    reject(new Error('Timed out'));
                }, timeout);
            }
        });
    }
    check(message) {
        if (message.channelId.value === this.channelId) {
            this.emit(CollectorEvent.Message, message);
        }
    }
    destroy() {
        this.emit(CollectorEvent.End);
        this.removeAllListeners();
    }
}
exports.default = Collector;
//# sourceMappingURL=Collector.js.map