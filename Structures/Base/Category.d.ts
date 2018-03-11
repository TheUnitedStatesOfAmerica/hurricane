import { Collection } from "branches";
import Command from "./Command";
import Client from "../../Core/Client";
export default class Category {
    name: string;
    commands: Collection<Command>;
    client: Client;
    prefixes?: string[];
    constructor(client: Client);
}
