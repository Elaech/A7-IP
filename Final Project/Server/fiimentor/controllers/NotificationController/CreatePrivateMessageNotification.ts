import {PrivateMessageNotificationRepository} from "../../Repositories/PrivateMessageNotificationRepository";
import {PrivateMessageNotification} from "../../models/entities/PrivateMessageNotification";

export class CreatePrivateMessageNotification {
    static async createNotification(receiverId:number,senderId:number):Promise<void>{
        const privateMessageNotificationRepository= new PrivateMessageNotificationRepository();
        const privateMessageNotification = new PrivateMessageNotification();
        privateMessageNotification.userId = receiverId;
        privateMessageNotification.senderId = senderId;

        await privateMessageNotificationRepository.create(privateMessageNotification);
    }
}