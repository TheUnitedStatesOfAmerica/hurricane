import {Collection} from "branches";
import Command from "../Structures/Base/Command";
import Supervisor from './Engine/Supervisor';
import Manager from '../Structures/Manager';
import CommandHandler from './Engine/Managers/CommandHandler';

// import some water

export default class Client extends Water {
    public commands: CommandHandler;
    public managers: Collection<Manager>;
    private supervisor: Supervisor = new Supervisor();

    constructor(token: string) {
        super(token);
        this.managers = this.supervisor.loadManagers();
        this.commands = new CommandHandler();
        this.commands.loadCommands();
    }
}
