import MenuOption from "./MenuOption";

export default class Menu {
    public title: string;
    public description: string;
    public options: Map<MenuOption["title"], MenuOption> = new Map();
}