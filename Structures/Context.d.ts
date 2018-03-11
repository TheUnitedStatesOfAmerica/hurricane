import { Message } from "discord-models/channel";
import EmbedBuilder from "./EmbedBuilder";
import Client from "../Core/Client";
import MenuBuilder from "./MenuBuilder";
import Command from "./Base/Command";
export default class Context {
    private message;
    private client;
    private args;
    private flags_?;
    private command_;
    private embed_;
    private menu_;
    constructor(client: Client, message: Message, args: string[], command: Command, flags?: string[]);
    readonly msg: Message;
    readonly m: Message;
    readonly flags: string[] | undefined;
    readonly embed: EmbedBuilder;
    readonly menu: MenuBuilder;
    readonly command: Command;
}
