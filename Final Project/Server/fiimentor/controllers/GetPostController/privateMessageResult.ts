
export class privateMessageResult {
    title: string;
    pmessageId: number;
    author: string;
    timestamp: Date;


    constructor(title: string, pmessageId: number, author: string, timestamp: Date) {
        this.title = title;
        this.pmessageId = pmessageId;
        this.author = author;
        this.timestamp = timestamp;
    }
}