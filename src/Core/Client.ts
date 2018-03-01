import {Collection} from "branches";
import Command from "../Structures/Base/Command";
import Supervisor from './Engine/Supervisor';
import Manager from '../Structures/Manager';

// import some water

export default class Client extends Water {
    public commands: Collection<Command> = new Collection();
    public supervisor: Supervisor = new Supervisor();
    public managers: Collection<Manager>;

    constructor(token: string) {
        super(token);
        this.managers = this.supervisor.loadManagers();
    }
}
