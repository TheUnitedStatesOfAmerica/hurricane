import Manager from "../../Structures/Manager";
import Client from "../Client"
import { Collection } from "branches";
import Command from '../../Structures/Base/Command';
import { Message } from "discord-models/channel";
import Context from "../../Structures/Context";

export default class CommandHandler extends Manager {
    protected commands: Collection<Command> = new Collection<Command>();

    private client: Client;
    private prefixes = this.client.config.prefixes;

    public constructor(client: Client) {
        super();

        this.client = client;
    }

    public init(): any {
        this.client.events.on('message', (m) => { this.check(m); });
    }

    public loadCommands(): Collection<Command> {
        return this.commands;
    }

    public addCommand(command: Command): Command | Error {
        if(this.commands.get(command.name)) return new Error('Command already exists!');
        else {
            try {
                this.commands.set(command.name, command);
                return this.commands.get(command.name);
            } catch(e) {
                return new Error('Could not add command!');
            }
        }
    }

    public getAll(): Collection<Command> {
        return this.commands;
    }

    public get(name: Command["name"]): Command | Error {
        const c = this.commands.get(name);
        return c ? c : new Error('Could not find command');
    }

    private checkPrefix(message: Message): string | undefined {
        const content = message.content.replace(/<@!/g, '<@');
        return this.prefixes.find(p => content.startsWith(p));
    }

    private async check(message: Message) {
        if(message.author.bot) return;

        if(!(await this.process(message))) {
            this.client.awaiter.invokeAllCollectors(message);
        }
    }

    protected async process(message: Message): Promise<Command | null> {
        const prefix = this.checkPrefix(message);
        if(!prefix) return null;

        const args: string[] = message.content.slice(prefix.length).trim().split(' ');
        let command: Command | undefined = this.commands.find(() => args[0]);

        // If we don't have a command, but we might have aliases
        // so we do a more expensive search here instead of searching for it before
        if(!command) {
            command = this.commands.find((c: Command) => (c.aliases && c.aliases.find((t: string) => t === args[0])) ? c : undefined);
            if(!command) return null;
        }

        // If the command is NSFW, we need to perform a check that the channel
        // is also NSFW.
        //
        // We pull this data from Redis, as we don't want an expensive operation
        // (querying a DB).
        //
        // If the command is NSFW but the channel is not, we just return null.
        if (command.nsfw) {
            let cachedChannel;

            try {
                cachedChannel = await this.client.store.channels.get(message.channelId);
            } catch (e) {
                // TODO: log this, an error occurred while deserializing an
                // object from redis!

                return null;
            }

            // If we can't get the channel for some reason (invalid state?),
            // just return: better to be safe than sorry.
            if (!cachedChannel) {
                // TODO: log invalid state

                return null;
            }

            if (!cachedChannel.nsfw) {
                return null;
            }
        }

        const ctx = new Context(this.client, message, args, command);
        command.process_(ctx).then((response: any) => {
            if(typeof response !== 'string') return;
            else this.client.createMessage(message.channelId, response);
        }, (err: Error) => {
            throw err;
        })
        return command;
    }
}
