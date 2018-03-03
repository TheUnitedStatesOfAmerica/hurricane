import { Snowflake } from 'discord-models';
import { Message } from 'discord-models/channel';
import Awaiter from '../Core/Engine/Awaiter';
import { EventEmitter } from 'eventemitter3';

export interface CollectorOptions {
    channelId: Snowflake;
    timeout: number;
}

export enum CollectorEvent {
    End = "COLLECTOR_END",
    Message = "COLLECTOR_MESSAGE",
}

export default class Collector extends EventEmitter {
    public channelId: Snowflake["value"];
    public awaiter: Awaiter;
    public timeout?: NodeJS.Timer;
    public stopped: boolean = false;

    constructor(options: { channelId: Snowflake["value"]; timeout?: number }, awaiter: Awaiter) {
        super();

        this.channelId = options.channelId;
        this.awaiter = awaiter;

        this.timeout = setTimeout(() => {
            this.emit(CollectorEvent.End);

            this.stopped = true;
        }, options.timeout || 10000);
    }

    public await(amount: number, filter?: (msg: Message) => boolean, timeout?: number): Promise<Map<Message["id"], Message>> {
        return new Promise((resolve, reject) => {
            const messages = new Map();

            this.on(CollectorEvent.Message, (receivedMessage: Message) => {
                if (filter && !filter(receivedMessage)) {
                    return;
                }

                messages.set(receivedMessage.id, receivedMessage);

                if (messages.size >= amount) {
                    resolve(messages);
                }
            });

            this.on(CollectorEvent.End, () => {
                reject(new Error(`Collector for ${this.channelId} timed out`));
            });

            if (timeout) {
                setTimeout(() => {
                    reject(new Error('Timed out'));
                }, timeout);
            }
        });
    }

    public check(message: Message) {
        if (message.channelId.value === this.channelId) {
            this.emit(CollectorEvent.Message, message);
        }
    }

    public destroy() {
        this.emit(CollectorEvent.End);

        this.removeAllListeners();
    }
}
