"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../../../Structures/Manager");
class EventManager extends Manager_1.default {
    constructor(client, redisConnector) {
        super();
        this.events = new Map();
        this.redisConnector = redisConnector;
        this.redisConnection = redisConnector.createConnection();
        this.client = client;
    }
    addEvent(event) {
        const events = this.events.get(event.eventName);
        if (events) {
            events.push(event);
        }
        else {
            this.events.set(event.eventName, [event]);
        }
    }
    init() {
        this.startEventLoop();
        return this;
    }
    async startEventLoop() {
        for (;;) {
            const [, msg] = await this.redisConnection.send_command('blpop', 'exchange:gateway_events', 0);
            let event;
            try {
                event = JSON.parse(msg);
            }
            catch (e) {
                console.log(e);
                continue;
            }
            this.process(event, msg);
        }
    }
    async process(event, rawMessage) {
        if (event.op === 0) {
            const payload = event.d;
            if (!event.t) {
                // log the fact that there's no type, this should be a bug
                return;
            }
            this.dispatch(event.t, payload);
        }
        else {
            this.forwardToSharder(rawMessage);
        }
    }
    dispatch(name, event) {
        const events = this.events.get(name);
        if (!events) {
            return;
        }
        for (const handler of events) {
            handler.process(event);
        }
    }
    forwardToSharder(rawMessage) {
        this.redisConnection.rpush('exchange:sharder_events', rawMessage);
    }
}
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map