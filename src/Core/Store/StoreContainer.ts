import Redis = require('ioredis');
import ChannelStore from './ChannelStore';

export default class StoreContainer {
    private _channels: ChannelStore;

    public constructor(redis: Redis.Redis) {
        this._channels = new ChannelStore(redis, 500);
    }

    public get channels(): StoreContainer['_channels'] {
        return this._channels;
    }
}
