import EventManager from "./Managers/EventManager";
import { Collection } from "branches";
import Manager from "../../Structures/Manager";
import Client from "../Client";

// TODO: IMPROVE ALL THIS SHIT ITS GROSS
export default class Supervisor {
    public managers: Collection<Manager> = new Collection();

    public constructor(client: Client) {
        this.managers.set("EventManager", new EventManager(client, client.config.redis));
    }
}