import { Message } from "discord-models/channel";
import EmbedBuilder from "./EmbedBuilder";
import Client from "../Core/Client";
import MenuBuilder from "./MenuBuilder";
import Command from "./Base/Command";
const minimist = require('minimist');

export default class Context {
    private message: Message;
    private client: Client;
    private args: string[];
    private flags_?: string[];
    private command_: Command;
    // private guild: RedisStore.guild.get(guildId) ???
    private embed_: EmbedBuilder = new EmbedBuilder(this.client);
    private menu_: MenuBuilder = new MenuBuilder(this.client, this.message.channelId);

    constructor(client: Client, message: Message, args: string[], command: Command, flags?: string[]) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.flags_ = flags;
        this.command_ = command;
    }

    get msg() {
        return this.message;
    }

    get m() {
        return this.message;
    }

    get flags() {
        if(!this.flags_) {
            this.flags_ = minimist(this.args);
            if(this.flags_) this.args = this.flags_.join().split(' ');
        }
        return this.flags_;
    }

    get embed() {
        return this.embed_;
    }

    get menu() {
        return this.menu_;
    }

    get command() {
        return this.command_;
    }

}