import Manager from "../../Structures/Manager";
import { Collection } from "branches";
import { Managers } from "./Managers/index";

export default class Supervisor {
    public managers: Collection<Manager> = this.loadManagers();

    public loadManagers(): Collection<Manager> {
        const managers = new Collection<Manager>();
        for(let key of Object.keys(Managers)) {
            const manager = new Managers[key]();
            managers.set(key, manager);
        }
        return managers;
    }
}