import { IComment } from "./IComment";
import { PrivateMessageRepository } from "../../Repositories/PrivateMessageRepository";
import { PrivateMessage } from "../../models/entities/PrivateMessage";

export class PrivateMessageIDComment implements IComment {

    private userId: number;
    private pmessageID: number;
    private content: string;
    private isAnonymous: number;

    constructor(userId: number,
        pmessageID: number,
        content: string,
        isAnonymous: number
    ) {
        this.userId = userId;
        this.pmessageID = pmessageID;
        this.content = content;
        this.isAnonymous = isAnonymous;
    }
    async createComment(): Promise<void> {
        const privateMessageRepository = new PrivateMessageRepository();
        const senderIdFromPrivateMessageId: number = (await privateMessageRepository.getById(this.pmessageID))[0].senderId;
        const newPrivateMessage: PrivateMessage = new PrivateMessage();
        newPrivateMessage.senderId = this.userId;
        newPrivateMessage.receiverId = senderIdFromPrivateMessageId;
        newPrivateMessage.content = this.content;
        newPrivateMessage.isAnonymous = this.isAnonymous;

        await privateMessageRepository.create(newPrivateMessage);
    }
}