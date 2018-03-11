import Client from '../Client';
export default class Loader {
    private client;
    constructor(client: Client);
    /**
     * Loads the files in a directory as categories and inserts them into the
     * client's command handler.
     *
     * @param {string} absolutePath Absolute path to the command files.
     * @returns {Promise.<void>} Promise that resolves when all commands have
     * been loaded.
     * @memberof Loader
     * @method
     * @public
     */
    loadCategories(absolutePath: string): Promise<void>;
    /**
     * Loads the files in a directory as commands and inserts them into the
     * client's command handler.
     *
     * @param {string} absolutePath Absolute path to the command files.
     * @returns {Promise.<void>} Promise that resolves when all commands have
     * been loaded.
     * @memberof Loader
     * @method
     * @public
     */
    loadCommands(absolutePath: string): Promise<void>;
    /**
     * Reads the filenames of a directory, resolving to an array of them.
     *
     * @param {string} absolutePath Absolute path to the files.
     * @returns {Promise.<string[]>} Promise resolving to an array of file
     * names.
     * @memberof Loader
     * @method
     * @private
     */
    private readDirectory(absolutePath);
}
