import Manager from "../../../Structures/Manager";
import Client from "../../Client"
import { Collection } from "branches";
import Command from "../../../Structures/Command";

export default class CommandHandler extends Manager {
    constructor(client: Client) {
        super();
        client.commands = this.loadCommands();
    }

    private loadCommands(): Collection<Command> {
        return new Collection<Command>();
    }

    private addCommand(): boolean | Error {
        return true;
    }
}