"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const water_1 = require("water");
const Supervisor_1 = require("./Engine/Supervisor");
const CommandHandler_1 = require("./Engine/CommandHandler");
const EventEmitter = require("eventemitter3");
const Awaiter_1 = require("./Engine/Awaiter");
const RedisConnector_1 = require("./Engine/RedisConnector");
const StoreContainer_1 = require("./Store/StoreContainer");
class Client extends water_1.default {
    constructor(token, options) {
        super({ token: token });
        this.awaiter = new Awaiter_1.default();
        this.config = options;
        this.events = new EventEmitter();
        this.redisConnector = new RedisConnector_1.default(options.redis);
        this.redis = this.redisConnector.createConnection();
        this.store = new StoreContainer_1.default(this.redis);
        this.supervisor = new Supervisor_1.default(this);
        // Note: We pass the entire command handler into this.commands
        // and disallow accessing the commands from the handler,
        // except through its own methods.
        // This is to avoid the actual commands being mutable
        this.commands = new CommandHandler_1.default(this);
        this.commands.loadCommands();
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map