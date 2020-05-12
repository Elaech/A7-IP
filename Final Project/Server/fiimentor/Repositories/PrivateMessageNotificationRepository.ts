import { ReadWriteRepository } from "./ReadWriteRepository";
import { PrivateMessageNotification } from "../models/entities/PrivateMessageNotification";
import {CommentNotification} from "../models/entities/CommentNotification";
import {PrivateMessage} from "../models/entities/PrivateMessage";

export class PrivateMessageNotificationRepository extends ReadWriteRepository<PrivateMessageNotification> {
    constructor() {
        super(PrivateMessageNotification);
    }

    async updateSeen(userId:number,senderId:number):Promise<void> {
        await this.connection.manager
        .createQueryBuilder()
        .update(PrivateMessageNotification)
        .set({seen:1})
        .where("userId =:userid", { userid: userId })
        .andWhere("senderId=:senderid", {senderid: senderId})
        .execute();
    }

    async getUnseenPrivateMessageNotification(userId: number): Promise<PrivateMessageNotification[]> {
        return await this.connection.manager
            .find(PrivateMessageNotification, {where: {userId: userId, Seen: 0}})
    }
}