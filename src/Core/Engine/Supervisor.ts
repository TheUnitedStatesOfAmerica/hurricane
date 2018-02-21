import Manager from "../../Structures/Manager";
import { Collection } from "branches";
import { Managers, IManagers } from "./Managers/index";

export default class Supervisor {
    public managers: Collection<Manager> = this.loadManagers();

    public loadManagers(): Collection<Manager> {
        const managers = new Collection<Manager>();
        Object.keys(Managers).forEach((key: keyof IManagers) => {
            const manager = Managers[key];
            managers.set(key, manager);
        })
        return managers;
    }
}