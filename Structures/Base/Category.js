"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const branches_1 = require("branches");
class Category {
    constructor(client) {
        this.name = this.constructor.name;
        this.client = client;
        this.commands = new branches_1.Collection();
    }
}
exports.default = Category;
//# sourceMappingURL=Category.js.map