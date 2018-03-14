/// <reference types="ioredis" />
import Manager from '../../../Structures/Manager';
import RedisConnector from '../RedisConnector';
import { Redis } from 'ioredis';
import Client from '../../Client';
import { GatewayEvent, DispatchEventTypeName } from 'discord-models/event';
import Event from '../../../Structures/Base/Event';
export default class EventManager extends Manager {
    events: Map<DispatchEventTypeName, Event[]>;
    protected redisConnector: RedisConnector;
    protected redisConnection: Redis;
    protected client: Client;
    constructor(client: Client, redisConnector: RedisConnector);
    addEvent(event: Event): void;
    init(): this;
    protected startEventLoop(): Promise<void>;
    protected process(event: GatewayEvent, rawMessage: string): Promise<void>;
    private dispatch(name, event);
    private forwardToSharder(rawMessage);
}
