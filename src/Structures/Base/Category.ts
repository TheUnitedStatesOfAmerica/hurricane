import { Collection } from "branches";
import Command from "./Command";
import Client from "../../Core/Client";

export default class Category {
    public name: string = this.constructor.name;
    public commands: Collection<Command>;
    public client: Client;
    public prefixes?: string[];
    
    constructor(client: Client) {
        this.client = client;
        this.commands = new Collection<Command>();
    }
}