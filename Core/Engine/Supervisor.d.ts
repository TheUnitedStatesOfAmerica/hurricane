import { Collection } from "branches";
import Manager from "../../Structures/Manager";
import Client from "../Client";
export default class Supervisor {
    managers: Collection<Manager>;
    constructor(client: Client);
}
