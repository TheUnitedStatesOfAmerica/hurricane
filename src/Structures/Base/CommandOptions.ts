import { Collection } from "branches";
import Permission from "./Permission";

export default interface CommandOptions {
    permissions?: Collection<Permission>;
    prefixes?: string[] | string;
    aliases?: string[] | string;
    nsfw?: boolean;
    hidden?: boolean;
    cooldown?: number;
}