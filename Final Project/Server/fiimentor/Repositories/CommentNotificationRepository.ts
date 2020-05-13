import { ReadWriteRepository } from "./ReadWriteRepository";
import { CommentNotification } from "../models/entities/CommentNotification";
import {PostNotification} from "../models/entities/PostNotification";

export class CommentNotificationRepository extends ReadWriteRepository<CommentNotification> {
    constructor() {
        super(CommentNotification);
    }

    async updateSeen(userId:number,postCommentId:number):Promise<void> {
        await this.connection.manager
        .createQueryBuilder()
        .update(CommentNotification)
        .set({seen:1})
        .where("userId =:userid", { userid: userId })
        .andWhere("postcommentId=:postcommentid", {postcommentid: postCommentId})
        .execute();
    }

    async getUnseenCommentNotification(userId: number): Promise<CommentNotification[]> {
        return await this.connection.manager
            .find(CommentNotification, {where: {userId: userId, seen: 0}})
    }
}