/// <reference types="ioredis" />
import { Snowflake } from 'discord-models';
import Redis = require('ioredis');
import { BaseStore } from './BaseStore';
import CachedChannel from './Structures/CachedChannel';
export default class ChannelStore extends BaseStore<Snowflake, CachedChannel> {
    constructor(redis: Redis.Redis, cacheSize?: number);
}
