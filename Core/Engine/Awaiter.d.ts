import Collector from '../../Structures/Collector';
import { Snowflake } from "discord-models";
import { Message } from 'discord-models/channel';
export default class Awaiter {
    collectors: Map<Snowflake, Collector[]>;
    protected readonly collectorLimit: number;
    addCollector(options: {
        channelId: Snowflake;
        timeout: number;
    }): Collector;
    invokeAllCollectors(message: Message): void[] | false;
    shutdown(): void;
}
