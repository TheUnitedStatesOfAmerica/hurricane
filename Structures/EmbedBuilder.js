"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmbedBuilder {
    constructor(client) {
        this.client = client;
        this.color = 7506394;
        this.fields = [];
        this.type = 'rich';
    }
    setAuthor(a) {
        return this.author = a;
    }
    setAuthorName(n) {
        this.author ? this.author.name = n : this.author = { name: n };
    }
    setAuthorIconUrl(i) {
        this.author ? this.author.icon_url = i : this.author = { name: '', icon_url: i };
    }
    setAuthorUrl(i) {
        this.author ? this.author.url = i : this.author = { name: '', url: i };
    }
    setColor(c) {
        return this.color = c;
    }
    setDescription(d) {
        return this.description = d;
    }
    setFields(a) {
        return this.fields = a;
    }
    addField(f) {
        return this.fields.push(f);
    }
    setFooter(f) {
        return this.footer = f;
    }
    setFooterIconUrl(f) {
        this.footer ? this.footer.icon_url = f : this.footer = { text: '', icon_url: f };
    }
    setFooterText(t) {
        this.footer ? this.footer.text = t : this.footer = { text: t };
    }
    setImage(i) {
        return this.image = i;
    }
    setThumbnail(t) {
        return this.thumbnail = t;
    }
    send(channel) {
        return this.client.createMessage(channel, { embed: this.make() });
    }
    make() {
        return {
            color: this.color,
            description: this.description,
            fields: this.fields,
            footer: this.footer,
            image: this.image,
            thumbnail: this.thumbnail,
            title: this.title,
            type: this.type,
            url: this.url,
        };
    }
}
exports.default = EmbedBuilder;
//# sourceMappingURL=EmbedBuilder.js.map