"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../../Structures/Manager");
const branches_1 = require("branches");
const Context_1 = require("../../Structures/Context");
const DefaultCategory_1 = require("../../Structures/Base/DefaultCategory");
class CommandHandler extends Manager_1.default {
    constructor(client) {
        super();
        this.commands = new branches_1.Collection();
        this.prefixes = this.client.config.prefixes;
        this.categories = new branches_1.Collection();
        this.client = client;
    }
    init() {
        const defaultCategory = new DefaultCategory_1.default(this.client);
        this.categories.set(defaultCategory.name, defaultCategory);
        this.client.events.on('message', (m) => { this.check(m); });
    }
    loadCommands() {
        return this.commands;
    }
    addCommand(Command) {
        if (this.commands.get(Command.constructor.name))
            throw new Error('Command already exists!');
        try {
            const command = Command.constructor.call(this.client);
            if (command.category) {
                const category = this.categories.get(command.category.name);
                if (category)
                    category.commands.set(Command.constructor.name, command);
                else
                    throw new Error('Category is unregistered');
            }
            this.commands.set(Command.constructor.name, command);
            return this.commands.get(command.name);
        }
        catch (e) {
            throw new Error('Could not add command!');
        }
    }
    addCategory(Category) {
        const category = Category.constructor.call(this.client);
        this.categories.set(category.name, category);
        return category;
    }
    getAll() {
        return this.commands;
    }
    get(name) {
        const c = this.commands.get(name);
        return c ? c : new Error('Could not find command');
    }
    checkPrefix(message) {
        const content = message.content.replace(/<@!/g, '<@');
        return this.prefixes.find(p => content.startsWith(p));
    }
    async check(message) {
        if (message.author.bot)
            return;
        if (!(await this.process(message))) {
            this.client.awaiter.invokeAllCollectors(message);
        }
    }
    async process(message) {
        const prefix = this.checkPrefix(message);
        if (!prefix)
            return null;
        const args = message.content.slice(prefix.length).trim().split(' ');
        let command = this.commands.find(() => args[0]);
        // If we don't have a command, but we might have aliases
        // so we do a more expensive search here instead of searching for it before
        if (!command) {
            command = this.commands.find((c) => (c.aliases && c.aliases.find((t) => t === args[0])) ? c : undefined);
            if (!command)
                return null;
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
            }
            catch (e) {
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
        const ctx = new Context_1.default(this.client, message, args, command);
        command.process_(ctx).then((response) => {
            if (typeof response === 'string') {
                this.client.createMessage(message.channelId, {
                    content: response,
                });
            }
        }, (err) => {
            throw err;
        });
        return command;
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map