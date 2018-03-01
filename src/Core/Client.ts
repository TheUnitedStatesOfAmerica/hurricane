import {Collection} from "branches";
import Water from "water";
import Command from "../Structures/Base/Command";
import Supervisor from './Engine/Supervisor';
import Manager from '../Structures/Manager';
import CommandHandler from './Engine/CommandHandler';
import EventEmitter from "eventemitter3";

// import some water

export default class Client extends Water {
    public commands: CommandHandler;
    public managers: Collection<Manager>;
    public events: EventEmitter;
    private supervisor: Supervisor;

    constructor(token: string) {
        super(token);
        this.events = new EventEmitter();
        this.managers = new Supervisor(this);

        // Note: We pass the entire command handler into this.commands
        // and disallow accessing the commands from the handler,
        // except through its own methods.
        // This is to avoid the actual commands being mutable
        this.commands = new CommandHandler();
        this.commands.loadCommands();
    }
}
