"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventManager_1 = require("./Managers/EventManager");
const branches_1 = require("branches");
// TODO: IMPROVE ALL THIS SHIT ITS GROSS
class Supervisor {
    constructor(client) {
        this.managers = new branches_1.Collection();
        this.managers.set("EventManager", new EventManager_1.default(client, client.redisConnector));
    }
}
exports.default = Supervisor;
//# sourceMappingURL=Supervisor.js.map