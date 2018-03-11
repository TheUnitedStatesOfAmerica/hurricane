"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const branches_1 = require("branches");
class DefaultCategory {
    constructor(client) {
        this.name = 'No Category';
        this.commands = new branches_1.Collection();
        this.client = client;
        this.prefixes = this.client.config.prefixes;
    }
}
exports.default = DefaultCategory;
//# sourceMappingURL=DefaultCategory.js.map