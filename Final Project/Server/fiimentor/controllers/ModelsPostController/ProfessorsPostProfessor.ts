import { IProfessorsPostOption } from "./IProfessorsPostOption";
import { ProfessorRepository } from "../../Repositories/ProfessorRepository";
import { PrivateMessageRepository } from "../../Repositories/PrivateMessageRepository";
import { PrivateMessage } from "../../models/entities/PrivateMessage";

export class ProfessorsPostProfessor implements IProfessorsPostOption {

    private body: any;
    private userId: number;
    private title: string;
    private content: string;
    private isAnonymous: number;

    constructor(body: any, userId: number, title: string, content: string, isAnonymous: number) {
        this.body = body;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.isAnonymous = isAnonymous;
    }

    async createProfessorsPost(): Promise<void> {
        const professorRepository = new ProfessorRepository();
        const professorId = this.body.professors.professorId;
        const professorUserId: number = (await professorRepository.getById(professorId))[0].userId;

        const privateMessageRepository = new PrivateMessageRepository();
        const newPrivateMessage: PrivateMessage = new PrivateMessage();
        newPrivateMessage.senderId = this.userId;
        newPrivateMessage.receiverId = professorUserId;
        newPrivateMessage.content = this.title + '\n' + this.content;
        newPrivateMessage.isAnonymous = this.isAnonymous;

        await privateMessageRepository.create(newPrivateMessage);
    }

}
