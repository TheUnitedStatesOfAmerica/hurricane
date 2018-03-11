"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../../../Structures/Manager");
class EventManager extends Manager_1.default {
    constructor(client, redisConnector) {
        super();
        this.redisConnector = redisConnector;
        this.events = client.events;
        this.redisConnection = redisConnector.createConnection();
    }
    init() {
        this.startEventLoop();
        return this;
    }
    async startEventLoop() {
        for (;;) {
            const [, msg] = await this.redisConnection.send_command("blpop", "exchange:gateway_events", 0);
            console.log(msg);
            let event;
            try {
                event = JSON.parse(msg);
            }
            catch (e) {
                console.log(e);
                continue;
            }
            this.events.emit(event);
            console.log(event);
        }
    }
}
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map