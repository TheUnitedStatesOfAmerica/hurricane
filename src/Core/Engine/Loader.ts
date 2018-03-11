import * as fs from 'fs';
import * as path from 'path';
import Client from '../Client';

export default class Loader {
    public constructor(private client: Client) {
    }

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
    public async loadCategories(absolutePath: string): Promise<void> {
        const filenames = await this.readDirectory(absolutePath);

        for (const filename in filenames) {
            this.client.commands.addCategory(require(filename));
        }
    }

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
    public async loadCommands(absolutePath: string): Promise<void> {
        const filenames = await this.readDirectory(absolutePath);

        for (const filename of filenames) {
            this.client.commands.addCommand(require(filename));
        }
    }

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
    private readDirectory(absolutePath: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(absolutePath, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files.filter(f => f.endsWith('.js'))
                        .map(f => path.join(absolutePath, f)));
                }
            });
        });
    }
}
