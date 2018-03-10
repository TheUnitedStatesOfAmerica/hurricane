import { Collection } from "branches";
import Command from "./Command";
import Client from "../../Core/Client";
import Instantiable from "./Instantiable";

export default interface Category extends Instantiable {
    name: string;
    commands: Collection<Command>;
    client: Client;
    prefixes: string[];
}