import CommandOptions from "./CommandOptions";
import Category from "./Category";
import Context from "../Context";
import Client from "../../Core/Client";
import Instantiable from "./Instantiable";
export default interface Command extends Instantiable {
    name: string;
    usage: string;
    aliases?: string[];
    description?: string;
    category?: Category;
    options?: CommandOptions;
    nsfw?: boolean;
    process_: (ctx: Context) => Promise<void>;
}