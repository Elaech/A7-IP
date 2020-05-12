import {ReadWriteRepository} from "./ReadWriteRepository";
import {PostNotification} from "../models/entities/PostNotification";
import {Professor} from "../models/entities/Professor";
import {Post} from "../models/entities/Post";

export class PostNotificationRepository extends ReadWriteRepository<PostNotification> {
    constructor() {
        super(PostNotification);
    }

    async updateSeen(userId: number, postId: number): Promise<void> {
        await this.connection.manager
            .createQueryBuilder()
            .update(PostNotification)
            .set({seen: 1})
            .where(" userId= :userid AND postId = :postid", {userid: userId, postid: postId})
            .execute();
    }

    async getUnseenPostNotification(userId: number): Promise<PostNotification[]> {
        return await this.connection.manager
            .find(PostNotification, {where: {userId: userId, seen: 0}})
    }


}