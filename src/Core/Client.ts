import Water from "water";
import Supervisor from './Engine/Supervisor';
import CommandHandler from './Engine/CommandHandler';
import * as EventEmitter from "eventemitter3";
import Awaiter from "./Engine/Awaiter";

// import some water

export default class Client extends Water {
    public commands: CommandHandler;
    public events: EventEmitter;
    public config: {prefixes: [string]};
    public awaiter: Awaiter = new Awaiter();
    private supervisor: Supervisor;

    constructor(token: string, options: {prefixes: [string]}) {
        super(token);
        this.config = options;
        this.events = new EventEmitter();
        this.supervisor = new Supervisor(this);

        // Note: We pass the entire command handler into this.commands
        // and disallow accessing the commands from the handler,
        // except through its own methods.
        // This is to avoid the actual commands being mutable
        this.commands = new CommandHandler(this);
        this.commands.loadCommands();
    }
}
