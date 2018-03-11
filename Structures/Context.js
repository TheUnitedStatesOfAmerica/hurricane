"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbedBuilder_1 = require("./EmbedBuilder");
const MenuBuilder_1 = require("./MenuBuilder");
const minimist = require('minimist');
class Context {
    constructor(client, message, args, command, flags) {
        // private guild: RedisStore.guild.get(guildId) ???
        this.embed_ = new EmbedBuilder_1.default(this.client);
        this.menu_ = new MenuBuilder_1.default(this.client, this.message.channelId);
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
        if (!this.flags_) {
            this.flags_ = minimist(this.args);
            if (this.flags_)
                this.args = this.flags_.join().split(' ');
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
exports.default = Context;
//# sourceMappingURL=Context.js.map