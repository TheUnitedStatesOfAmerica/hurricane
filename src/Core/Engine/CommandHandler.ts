import Manager from "../../Structures/Manager";
import Client from "../Client"
import { Collection } from "branches";
import Command from '../../Structures/Base/Command';
import { Message } from "discord-models/channel";
import Context from "../../Structures/Context";
import DefaultCategory from "../../Structures/Base/DefaultCategory";
import Category from "../../Structures/Base/Category";

export default class CommandHandler extends Manager {
    protected commands: Collection<Command> = new Collection<Command>();

    private client: Client;
    private prefixes = this.client.config.prefixes;
    private categories: Collection<Category> = new Collection();

    public constructor(client: Client) {
        super();

        this.client = client;
    }

    public init(): any {
        const defaultCategory = new DefaultCategory(this.client);
        this.categories.set(defaultCategory.name, defaultCategory);
        this.client.events.on('message', (m) => { this.check(m); });
    }

    public loadCommands(): Collection<Command> {
        return this.commands;
    }

    public addCommand<T extends Command>(Command: T): Command {
        if(this.commands.get(Command.constructor.name)) throw new Error('Command already exists!');
        try {
            const command: Command = Command.constructor.call(this.client);

            if(command.category) {
                const category: Category = this.categories.get(command.category.name);
                if(category) category.commands.set(Command.constructor.name, command);
                else throw new Error('Category is unregistered');
            }
            this.commands.set(Command.constructor.name, command);
            return this.commands.get(command.name);
        } catch(e) {
            throw new Error('Could not add command!');
        }
    }

    public addCategory(Category: Category): Category {
        const category = Category.constructor.call(this.client);

        this.categories.set(category.name, category);
        return category;
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
            if (typeof response === 'string') {
                this.client.createMessage(message.channelId, {
                    content: response,
                });
            }
        }, (err: Error) => {
            throw err;
        })
        return command;
    }
}
