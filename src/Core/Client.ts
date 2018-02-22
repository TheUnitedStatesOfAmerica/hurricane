import {Collection} from "branches";
import Command from "../Structures/Command";

// import some water

export default class Client extends Water {
    public commands: Collection<Command> = new Collection();

    constructor(token: string) {
        super(token);
    }
}
