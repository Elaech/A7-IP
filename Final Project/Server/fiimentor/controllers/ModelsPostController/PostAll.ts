import { IPostOption } from "./IPostOption";
import { createPostAll } from "../postController";

export class PostAll implements IPostOption {

    private body: any;
    private userId: number;
    constructor(body: any, userId: number) {
        this.body = body;
        this.userId = userId;
    }
    async createPost(): Promise<void> {
        await createPostAll(this.body, this.userId, 'allUsers');
    }
}
