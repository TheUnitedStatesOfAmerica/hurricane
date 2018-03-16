/// <reference types="ioredis" />
import Manager from '../../../Structures/Manager';
import RedisConnector from '../RedisConnector';
import { Redis } from 'ioredis';
import Client from '../../Client';
import { GatewayEvent, DispatchEventTypeName, DispatchEventType } from 'discord-models/event';
import Event from '../../../Structures/Base/Event';
export default class EventManager extends Manager {
    events: Map<DispatchEventTypeName, Event<DispatchEventType>[]>;
    protected redisConnector: RedisConnector;
    protected redisConnection: Redis;
    protected client: Client;
    constructor(client: Client, redisConnector: RedisConnector);
    addEvent(event: Event<any>): void;
    init(): this;
    protected startEventLoop(): Promise<void>;
    protected process(event: GatewayEvent, shardId: number, rawMessage: string): Promise<void>;
    private dispatch(name, shardId, event);
    private forwardToSharder(rawMessage, shardId);
}
