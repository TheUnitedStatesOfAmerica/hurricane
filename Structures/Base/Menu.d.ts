import MenuOption from "./MenuOption";
export default class Menu {
    title?: string;
    description?: string;
    options: Map<MenuOption["title"], MenuOption>;
    constructor(data?: {
        title?: string;
        description?: string;
    });
}
