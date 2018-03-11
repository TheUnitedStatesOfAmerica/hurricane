/// <reference types="node" />
import { Snowflake } from 'discord-models';
import { Message } from 'discord-models/channel';
import Awaiter from '../Core/Engine/Awaiter';
import { EventEmitter } from 'eventemitter3';
export interface CollectorOptions {
    channelId: Snowflake;
    timeout: number;
}
export declare enum CollectorEvent {
    End = "COLLECTOR_END",
    Message = "COLLECTOR_MESSAGE",
}
export default class Collector extends EventEmitter {
    channelId: Snowflake["value"];
    awaiter: Awaiter;
    timeout?: NodeJS.Timer;
    stopped: boolean;
    constructor(options: {
        channelId: Snowflake["value"];
        timeout?: number;
    }, awaiter: Awaiter);
    await(amount: number, filter?: (msg: Message) => boolean, timeout?: number): Promise<Map<Message["id"], Message>>;
    check(message: Message): void;
    destroy(): void;
}
