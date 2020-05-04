import { IProfessorsPostOption } from "./IProfessorsPostOption";
import { PrivateMessageRepository } from "../../Repositories/PrivateMessageRepository";
import { PrivateMessage } from "../../models/entities/PrivateMessage";

export class ProfessorsPostTutor implements IProfessorsPostOption {

    private req: any;
    private userId: number;
    private title: string;
    private content: string;
    private isAnonymous: number;

    constructor(req: any, userId: number, title: string, content: string, isAnonymous: number) {
        this.req = req;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.isAnonymous = isAnonymous;
    }

    async createProfessorsPost(): Promise<void> {
        const tutorId = this.req.user.payload.tutorId;

        const privateMessageRepository = new PrivateMessageRepository();
        const newPrivateMessage: PrivateMessage = new PrivateMessage();

        newPrivateMessage.senderId = this.userId;
        newPrivateMessage.receiverId = tutorId;
        newPrivateMessage.content = this.title + '\n' + this.content;
        newPrivateMessage.isAnonymous = this.isAnonymous;

        await privateMessageRepository.create(newPrivateMessage);

    }

}
