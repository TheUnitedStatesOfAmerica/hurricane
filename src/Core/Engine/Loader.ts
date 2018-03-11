import * as fs from 'fs';
import * as path from 'path';
import Command from '../../Structures/Base/Command';
import Category from '../../Structures/Base/Category';
import Client from '../Client';

export default class Loader {
    public constructor(private client: Client) {
    }

    /**
     * Loads the files in a directory as categories and inserts them into the
     * client's command handler.
     *
     * @param {string} absolutePath Absolute path to the command files.
     * @returns {Promise.<null>} Promise that resolves when all commands have
     * been loaded.
     * @memberof Loader
     * @method
     * @public
     */
    public loadCategories(absolutePath: string): Promise<null> {
        return this.add<Category>(absolutePath, this.client.commands.addCategory);
    }

    /**
     * Loads the files in a directory as commands and inserts them into the
     * client's command handler.
     *
     * @param {string} absolutePath Absolute path to the command files.
     * @returns {Promise.<null>} Promise that resolves when all commands have
     * been loaded.
     * @memberof Loader
     * @method
     * @public
     */
    public loadCommands(absolutePath: string): Promise<null> {
        return this.add<Command>(absolutePath, this.client.commands.addCommand);
    }

    /**
     * Retrieves the files in the given path, requires their contents, and then
     * calls the provided function.
     *
     * @param {string} absolutePath Absolute path to the files.
     * @returns {Promise.<null>} Promise that resolves when all files have been
     * required.
     * @async
     * @memberof Loader
     * @method
     * @private
     */
    private async add<T>(absolutePath: string, func: (item: T) => void): Promise<null> {
        const filenames = await this.readDirectory(absolutePath);

        for (const filename of filenames) {
            if (!filename.endsWith('.js')) {
                continue;
            }

            const filePath = path.join(absolutePath, filename);
            const item = require(filePath);

            func(item);
        }

        return null;
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
                    resolve(files);
                }
            });
        });
    }
}
