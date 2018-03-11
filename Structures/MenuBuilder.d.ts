import EmbedBuilder from './EmbedBuilder';
import Awaiter from '../Core/Engine/Awaiter';
import Menu from './Base/Menu';
import MenuOption from './Base/MenuOption';
import Client from '../Core/Client';
import { Snowflake } from 'discord-models';
import { User } from 'discord-models/user';
export default class MenuBuilder extends Menu {
    awaiter: Awaiter;
    private collector;
    private client;
    constructor(client: Client, channelId: Snowflake);
    addOption(option: MenuOption): Menu | Error;
    addOptions(options: MenuOption[]): Menu | Error;
    createEmbedBuilder(): EmbedBuilder;
    destroy(): boolean;
    protected await(options: {
        user: {
            id: User["id"];
        };
        timeout: number;
    }, _resolve: Function, _reject: Function): void;
}
