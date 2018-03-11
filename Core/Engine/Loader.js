"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Loader {
    constructor(client) {
        this.client = client;
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
    loadCategories(absolutePath) {
        return this.add(absolutePath, this.client.commands.addCategory);
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
    loadCommands(absolutePath) {
        return this.add(absolutePath, this.client.commands.addCommand);
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
    async add(absolutePath, func) {
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
    readDirectory(absolutePath) {
        return new Promise((resolve, reject) => {
            fs.readdir(absolutePath, (err, files) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(files);
                }
            });
        });
    }
}
exports.default = Loader;
//# sourceMappingURL=Loader.js.map