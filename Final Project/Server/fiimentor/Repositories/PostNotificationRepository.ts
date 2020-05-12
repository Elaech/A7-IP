import { ReadWriteRepository } from "./ReadWriteRepository";
import { PostNotification } from "../models/entities/PostNotification";

export class PostNotificationRepository extends ReadWriteRepository<PostNotification> {
    constructor() {
        super(PostNotification);
    }

    async updateSeen(userId:number,postId:number):Promise<void> {
        await this.connection.manager
        .createQueryBuilder()
        .update(PostNotification)
        .set({seen:1})
        .where(" userId= :userid AND postId = :postid", { userid: userId, postid: postId })
        .execute();
    }
}