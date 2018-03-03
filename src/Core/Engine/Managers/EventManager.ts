import Manager from "../../../Structures/Manager";
import RedisConnector from "../RedisConnector";
import { RedisOptions, Redis } from "ioredis";
import * as EventEmitter from "eventemitter3";
import Client from "../../Client";

export default class EventManager extends Manager {
    public config: RedisOptions;
    public events: EventEmitter;
    protected redis: RedisConnector;
    protected connection: Redis;

    constructor(client: Client, config: RedisOptions) {
        super();
        this.redis = new RedisConnector(config);
        this.events = client.events;
        this.connection = this.redis.createConnection();
        this.config = config;

    }

    public init(): this {
        this.startEventLoop();
        return this;
    }

    protected async startEventLoop() {
        for ( ; ; ) {
            const [, msg] = await this.connection.send_command(
                "blpop",
                "exchange:gateway_events",
                0,
            );

            console.log(msg);

            let event;

            try {
                event = JSON.parse(msg);
            } catch (e) {
                console.log(e);

                continue;
            }

            this.events.emit(event);

            console.log(event);
        }
    }
}
