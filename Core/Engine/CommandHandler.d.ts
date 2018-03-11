import Manager from "../../Structures/Manager";
import Client from "../Client";
import { Collection } from "branches";
import Command from '../../Structures/Base/Command';
import { Message } from "discord-models/channel";
import Category from "../../Structures/Base/Category";
export default class CommandHandler extends Manager {
    protected commands: Collection<Command>;
    private client;
    private prefixes;
    private categories;
    constructor(client: Client);
    init(): any;
    loadCommands(): Collection<Command>;
    addCommand<T extends Command>(Command: T): Command;
    addCategory(Category: Category): Category;
    getAll(): Collection<Command>;
    get(name: Command["name"]): Command | Error;
    private checkPrefix(message);
    private check(message);
    protected process(message: Message): Promise<Command | null>;
}
