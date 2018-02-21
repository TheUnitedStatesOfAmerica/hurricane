import CommandHandler from "./CommandHandler";
import Manager from "../../../Structures/Manager";

export interface IManagers {
    [key: string]: Manager
}

export const Managers: IManagers = {
    "CommandHandler": CommandHandler
};