export class CommentModel {
    public author: string | null;
    public content: string;
    public timestamp: Date;
    public isAnonymous: number;

    constructor(author: string | null, content: string, timestamp: Date, isAnonymous: number) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
        this.isAnonymous = isAnonymous;
    }
}