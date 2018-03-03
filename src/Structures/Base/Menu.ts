import MenuOption from "./MenuOption";

export default class Menu {
    public title?: string;
    public description?: string;
    public options: Map<MenuOption["title"], MenuOption> = new Map();

    public constructor(data: { title?: string, description?: string } = {}) {
        this.description = data.description;
        this.title = data.title;
    }
}
