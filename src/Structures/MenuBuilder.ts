import EmbedBuilder from './EmbedBuilder';
import Awaiter from '../Core/Engine/Awaiter';
import Collector from './Collector';
import Menu from './Base/Menu';
import MenuOption from './Base/MenuOption';
import Client from '../Core/Client';
import { Snowflake } from 'discord-models';
import { EmbedField } from 'discord-models/channel';
import { User } from 'discord-models/user';

export default class MenuBuilder extends Menu {
    public awaiter: Awaiter;
    private collector: Collector;
    private client: Client;

    public constructor(client: Client, channelId: Snowflake) {
        super();

        this.client = client;
        this.awaiter = client.awaiter;
        this.collector = new Collector({ channelId: channelId.value }, this.awaiter);
    }

    public addOption(option: MenuOption): Menu | Error {
        const o = this.options.get(option.title);
        if(o) return this;
        else {
            try {
                this.options.set(option.title, option);
                return this;
            } catch(e) {
                return new Error('Could not set option');
            }
        }
    }

    public addOptions(options: MenuOption[]): Menu | Error {
        try {
            options.map(o => this.addOption(o));
            return this;
        } catch(e) {
            return new Error('Could not set options');
        }
    }

    public createEmbedBuilder(): EmbedBuilder {
        const embedBuilder = new EmbedBuilder(this.client);
        this.options.forEach(o => {
            const field = { name: o.title, value: o.title, inline: true } as EmbedField;
            embedBuilder.addField(field as EmbedField)
        });
        return embedBuilder;
    }

    public destroy(): boolean {
        if(this.collector) {
            this.collector.destroy();
            return true;
        }
        return false;
    }

    protected await(options: {user: {id: User["id"]}, timeout: number }, resolve: Function, reject: Function) {
        this.collector.await(1, message => message.author.id === options.user.id, options.timeout);
    }
}
