import CommandOptions from "./CommandOptions";
import Category from "./Category";

export default interface Command {
    name: string;
    usage: string;
    aliases?: string[];
    description?: string;
    category: Category;
    options?: CommandOptions;
    nsfw?: boolean;
}