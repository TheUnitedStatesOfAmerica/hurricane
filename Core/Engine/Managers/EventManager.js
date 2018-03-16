"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../../../Structures/Manager");
const event_1 = require("discord-models/event");
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
            const buf = Buffer.from(msg, 'utf8');
            const position = buf.lastIndexOf('}');
            if (!position) {
                console.log('Websocket message with no shard ID', msg);
                continue;
            }
            const sliceIdx = position + 1;
            const shardIdBuf = buf.slice(sliceIdx);
            const shardId = shardIdBuf.readUIntLE(0, shardIdBuf.length);
            const msgToParse = buf.slice(0, sliceIdx).toString('utf8');
            let event;
            try {
                event = JSON.parse(msgToParse);
            }
            catch (e) {
                console.log(e, msgToParse);
                continue;
            }
            this.process(event, shardId, msg.slice(0, sliceIdx));
        }
    }
    async process(event, shardId, rawMessage) {
        if (event.op === 0) {
            const payload = event.d;
            if (!event.t) {
                // log the fact that there's no type, this should be a bug
                return;
            }
            this.dispatch(event.t, shardId, payload);
        }
        else {
            this.forwardToSharder(rawMessage, shardId);
        }
    }
    dispatch(name, shardId, event) {
        if (name == event_1.DispatchEventTypeName.MessageCreate) {
            this.client.events.emit('message', event);
        }
        const events = this.events.get(name);
        if (!events) {
            return;
        }
        for (const handler of events) {
            handler.process(event, shardId);
        }
    }
    forwardToSharder(rawMessage, shardId) {
        this.redisConnection.rpush(`exchange:sharder:${shardId}`, rawMessage);
    }
}
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map