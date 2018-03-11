"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbedBuilder_1 = require("./EmbedBuilder");
const Collector_1 = require("./Collector");
const Menu_1 = require("./Base/Menu");
class MenuBuilder extends Menu_1.default {
    constructor(client, channelId) {
        super();
        this.client = client;
        this.awaiter = client.awaiter;
        this.collector = new Collector_1.default({ channelId: channelId.value }, this.awaiter);
    }
    addOption(option) {
        const o = this.options.get(option.title);
        if (o)
            return this;
        else {
            try {
                this.options.set(option.title, option);
                return this;
            }
            catch (e) {
                return new Error('Could not set option');
            }
        }
    }
    addOptions(options) {
        try {
            options.map(o => this.addOption(o));
            return this;
        }
        catch (e) {
            return new Error('Could not set options');
        }
    }
    createEmbedBuilder() {
        const embedBuilder = new EmbedBuilder_1.default(this.client);
        this.options.forEach(o => {
            const field = { name: o.title, value: o.title, inline: true };
            embedBuilder.addField(field);
        });
        return embedBuilder;
    }
    destroy() {
        if (this.collector) {
            this.collector.destroy();
            return true;
        }
        return false;
    }
    await(options, _resolve, _reject) {
        this.collector.await(1, message => message.author.id === options.user.id, options.timeout);
    }
}
exports.default = MenuBuilder;
//# sourceMappingURL=MenuBuilder.js.map