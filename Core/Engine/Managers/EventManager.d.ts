/// <reference types="ioredis" />
import Manager from "../../../Structures/Manager";
import RedisConnector from "../RedisConnector";
import { Redis } from "ioredis";
import * as EventEmitter from "eventemitter3";
import Client from "../../Client";
export default class EventManager extends Manager {
    events: EventEmitter;
    protected redisConnector: RedisConnector;
    protected redisConnection: Redis;
    constructor(client: Client, redisConnector: RedisConnector);
    init(): this;
    protected startEventLoop(): Promise<void>;
}
