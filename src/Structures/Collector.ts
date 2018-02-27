import { Snowflake } from 'discord-models/discord-models';
import { Message } from 'discord-models/channel';
import Awaiter from '../Core/Engine/Awaiter';
import { EventEmitter } from 'eventemitter3';


export default class Collector extends EventEmitter {
    public channelId: Snowflake;
    public awaiter: Awaiter;
    public awaiting: number = 0;
    public timeout?: number;
    public stopped: boolean = false;
    constructor(options: { channelId: Snowflake; timeout: number }, awaiter: Awaiter) {
        super();
        this.channelId = options.channelId;
        this.awaiter = awaiter;
        this.timeout = setTimeout(() => { 
            this.emit('COLLECTOR_END');
            this.stopped = true;
        }, options.timeout || 10000);
    }

    await(amount: number, filter?: void, timeout?: number): Promise<Map<Message["id"], Message>> {
        return new Promise((resolve, reject) => {
            this.awaiting++;
            const message = new Map();
            this.on('COLLECTOR_MESSAGE', (receivedMessage: Message) => {
                if(filter && !filter(receivedMessage)) return;
                message.set(receivedMessage.id, receivedMessage);
                if(message.size >= amount) {
                    resolve(message);
                }
            });
            this.on('COLLECTOR_END', () => {
                reject(new Error(`Collector for ${this.channelId} timed out`));
            })
        });
    }
}