import { Collection } from "branches";
import Command from "./Command";

export default interface Category {
    name: string;
    commands: Collection<Command>;
}