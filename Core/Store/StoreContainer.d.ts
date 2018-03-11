/// <reference types="ioredis" />
import Redis = require('ioredis');
export default class StoreContainer {
    private _channels;
    constructor(redis: Redis.Redis);
    readonly channels: StoreContainer['_channels'];
}
