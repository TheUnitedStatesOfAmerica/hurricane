import Category from "./Category";
import { Collection } from "branches";
import Command from "./Command";
import Client from "../../Core/Client";

export default class DefaultCategory implements Category {
    public name = 'No Category';
    public commands = new Collection<Command>();
    public client: Client;
    public prefixes: string[];
    constructor(client: Client) {
        this.client = client;
        this.prefixes = this.client.config.prefixes;
    }
}