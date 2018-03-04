import Manager from "../../Structures/Manager";
import Client from "../Client"
import { Collection } from "branches";
import Command from '../../Structures/Base/Command';
import { Message } from "discord-models/channel";

export default class CommandHandler extends Manager {
    protected commands: Collection<Command> = new Collection<Command>();

    private client: Client;
    private prefixes = this.client.config.prefixes;

    public constructor(client: Client) {
        super();

        this.client = client;
    }

    public init(): any {
        // TODO: implement from Manager
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

    public process(message: Message) {
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

        if(command.nsfw && message.channelId)

    }
}
