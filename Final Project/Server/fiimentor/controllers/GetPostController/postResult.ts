
export class postResult {
    title: string;
    postId: number;
    author: string;
    groupeId: number;
    timestamp: Date;

    constructor(title: string, postId: number, author: string, groupeId: number, timestamp: Date) {
        this.title = title;
        this.postId = postId;
        this.author = author;
        this.groupeId = groupeId;
        this.timestamp = timestamp;
    }
}