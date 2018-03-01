import Manager from "../../../Structures/Manager";
import Client from "../../Client"
import { Collection } from "branches";
import Command from '../../../Structures/Base/Command';

export default class CommandHandler extends Manager {

    protected commands: Collection<Command> = new Collection<Command>();

    public loadCommands(): Collection<Command> {
        return this.commands;
    }

    public addCommand(command: Command): Command | Error {
        if(this.commands.get(command.name)) return new Error('Command already exists!');
        else {
            try {
                this.commands.set(command.name, command);
                return this.commands.get(command.name);
            } catch(e) {
                return new Error('Could not add command!');
            }
        }
    }

    public getAll(): Collection<Command> {
        return this.commands;
    }

    public get(name: Command["name"]): Command | Error {
        const c = this.commands.get(name);
        return c ? c : new Error('Could not find command');
    }
}