import Collector from '../../Structures/Collector';
import { Snowflake } from "discord-models";
import { Message } from 'discord-models/channel';

export default class Awaiter {
    public collectors = new Map<Snowflake, Collector[]>();
    protected readonly collectorLimit: number = 2;

    public addCollector(options: { channelId: Snowflake, timeout: number }): Collector {
        let collectors = this.collectors.get(options.channelId);
        if(!collectors) { collectors = []; }
        if(collectors && collectors.length > this.collectorLimit) {
            throw new Error('Hitting collector per channel limit');
        }
        const collector = new Collector( { channelId: options.channelId.value }, this as Awaiter);
        collectors.push(collector);
        this.collectors.set(options.channelId, collectors);
        return collector;
    }

    invokeAllCollectors(message: Message): void[] | false {
        const collectors = this.collectors.get(message.channel_id);
        if(!collectors) return false;
        return collectors.map(c => c.check(message));
    }

    shutdown(): void {
        return this.collectors.clear();
    }
}
