import { IProfessorsPostOption } from "./IProfessorsPostOption";
import { createPostAll } from "../postController";

export class ProfessorsPostAll implements IProfessorsPostOption {

    private body: any;
    private userId: number;
    constructor(body: any, userId: number) {
        this.body = body;
        this.userId = userId;
    }
    async createProfessorsPost(): Promise<void> {
        await createPostAll(this.body, this.userId, 'allProfessors');
    }

}