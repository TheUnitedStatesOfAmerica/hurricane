import { Snowflake } from 'discord-models';
import Redis = require('ioredis');
import { BaseStore } from './BaseStore';
import CachedChannel from './Structures/CachedChannel';

export default class ChannelStore extends BaseStore<Snowflake, CachedChannel> {
    public constructor(redis: Redis.Redis, cacheSize: number = 0) {
        super(cacheSize, 'channels', redis);
    }
}
