import Manager from "../../../Structures/Manager";
import RedisConnector from "../RedisConnector";
import { Redis } from "ioredis";
import * as EventEmitter from "eventemitter3";
import Client from "../../Client";

export default class EventManager extends Manager {
    public events: EventEmitter;
    protected redisConnector: RedisConnector;
    protected redisConnection: Redis;

    constructor(client: Client, redisConnector: RedisConnector) {
        super();
        this.redisConnector = redisConnector;
        this.events = client.events;
        this.redisConnection = redisConnector.createConnection();

    }

    public init(): this {
        this.startEventLoop();
        return this;
    }

    protected async startEventLoop() {
        for ( ; ; ) {
            const [, msg] = await this.redisConnection.send_command(
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
