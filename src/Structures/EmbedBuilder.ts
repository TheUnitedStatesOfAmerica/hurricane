import { Embed, EmbedAuthor, EmbedField, EmbedFooter, EmbedImage, EmbedThumbnail } from 'discord-models/channel';
import {Client} from '..';

export default class EmbedBuilder implements Embed {
    public author?: EmbedAuthor;
    public colour: number = 7506394;
    public description?: string;
    public fields: EmbedField[] = [];
    public footer?: EmbedFooter;
    public image?: EmbedImage;
    public kind: string = 'rich';
    public thumbnail?: EmbedThumbnail;
    public title?: string;
    public url?: string;

    constructor(public client: Client) {}

    public setAuthor(a: EmbedAuthor) {
        return this.author = a;
    }

    public setAuthorName(n: EmbedAuthor["name"]) {
        this.author ? this.author.name = n : this.author = { name: n } as EmbedAuthor
    }

    public setAuthorIconUrl(i: EmbedAuthor["icon_url"]) {
        this.author ? this.author.icon_url = i : this.author = { name: '', icon_url: i } as EmbedAuthor
    }

    public setAuthorUrl(i: EmbedAuthor["url"]) {
        this.author ? this.author.url = i : this.author = { name: '', url: i } as EmbedAuthor
    }

    public setColor(c: number) {
        return this.colour = c;
    }

    public setDescription(d: string) {
        return this.description = d;
    }

    public setFields(a: EmbedField[]) {
        return this.fields = a;
    }

    public addField(f: EmbedField) {
        return this.fields.push(f);
    }

    public setFooter(f: EmbedFooter) {
        return this.footer = f;
    }

    public setFooterIconUrl(f: EmbedFooter["icon_url"]) {
        this.footer ? this.footer.icon_url = f : this.footer = { text: '', icon_url: f } as EmbedFooter
    }

    public setFooterText(t: EmbedFooter["text"]) {
        this.footer ? this.footer.text = t : this.footer = { text: t } as EmbedFooter
    }

    public setImage(i: EmbedImage) {
        return this.image = i;
    }

    public setThumbnail(t: EmbedThumbnail) {
        return this.thumbnail = t;
    }

    protected make(): Embed {
        return {
            colour: this.colour,
            description: this.description,
            url: this.url,
            fields: this.fields,
            footer: this.footer,
            image: this.image,
            kind: this.kind,
            thumbnail: this.thumbnail,
            title: this.title,
        } as Embed
    }

    public send() {
        return this.client.createMessage({ embed: this.make() });
    }
}