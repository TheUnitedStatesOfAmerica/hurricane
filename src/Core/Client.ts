import Water, { WaterOptions } from "water";
// import Supervisor from './Engine/Supervisor';
import CommandHandler from './Engine/CommandHandler';
import * as EventEmitter from "eventemitter3";
import Awaiter from "./Engine/Awaiter";
import RedisConnector from "./Engine/RedisConnector";
import { RedisOptions, Redis } from "ioredis";
import StoreContainer from "./Store/StoreContainer";

// import some water

export default class Client extends Water {
    public commands: CommandHandler;
    public events: EventEmitter;
    public config: { prefixes: string[], redis: RedisOptions };
    public awaiter: Awaiter = new Awaiter();
    public redis: Redis;
    public redisConnector: RedisConnector;
    public store: StoreContainer;
    // todo
    // private supervisor: Supervisor;

    constructor(token: string, options: { prefixes: string[], redis: RedisOptions }) {
        super({ token: token } as WaterOptions);
        this.config = options;
        this.events = new EventEmitter();
        this.redisConnector = new RedisConnector(options.redis);
        this.redis = this.redisConnector.createConnection();
        this.store = new StoreContainer(this.redis);
        // this.supervisor = new Supervisor(this);

        // Note: We pass the entire command handler into this.commands
        // and disallow accessing the commands from the handler,
        // except through its own methods.
        // This is to avoid the actual commands being mutable
        this.commands = new CommandHandler(this);
        this.commands.loadCommands();
    }
}
