import { ReadWriteRepository } from "./ReadWriteRepository";
import { PrivateMessageNotification } from "../models/entities/PrivateMessageNotification";

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
}