import CommandOptions from "./CommandOptions";
import Category from "./Category";
import Context from "../Context";
export default interface Command {
    name: string;
    usage: string;
    aliases?: string[];
    description?: string;
    category: Category;
    options?: CommandOptions;
    nsfw?: boolean;
    process_: (ctx: Context) => Promise<void>;
}