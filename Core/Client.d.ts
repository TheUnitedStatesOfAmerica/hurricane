/// <reference types="ioredis" />
import Water from "water";
import CommandHandler from './Engine/CommandHandler';
import * as EventEmitter from "eventemitter3";
import Awaiter from "./Engine/Awaiter";
import RedisConnector from "./Engine/RedisConnector";
import { RedisOptions, Redis } from "ioredis";
import StoreContainer from "./Store/StoreContainer";
export default class Client extends Water {
    commands: CommandHandler;
    events: EventEmitter;
    config: {
        prefixes: [string];
        redis: RedisOptions;
    };
    awaiter: Awaiter;
    redis: Redis;
    redisConnector: RedisConnector;
    store: StoreContainer;
    constructor(token: string, options: {
        prefixes: [string];
        redis: RedisOptions;
    });
}
