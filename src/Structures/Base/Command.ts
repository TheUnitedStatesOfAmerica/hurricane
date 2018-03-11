import CommandOptions from "./CommandOptions";
import Category from "./Category";
import Context from "../Context";

export default abstract class Command {
    name: string = this.constructor.name;
    usage: string = 'No description specified';
    aliases?: string[];
    description?: string;
    category?: Category;
    options?: CommandOptions;
    nsfw?: boolean;
    abstract process_(ctx: Context): Promise<void>;
    constructor() {}
}
