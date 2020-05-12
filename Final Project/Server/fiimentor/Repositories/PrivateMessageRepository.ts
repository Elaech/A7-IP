import { ReadWriteRepository } from "./ReadWriteRepository";
import { PrivateMessage } from "../models/entities/PrivateMessage";
import { Post } from "../models/entities/Post";
import { In, Like } from "typeorm";

export class PrivateMessageRepository extends ReadWriteRepository<PrivateMessage> {
    constructor() {
        super(PrivateMessage);
    }

    async getPrivateMessageList(skip: number, take: number, queryParam: string, anonParam: number[],
        firstRecipientId: number[], secondRecipientId: number[]): Promise<PrivateMessage[]> {
        return await this.connection.manager
            .find(PrivateMessage, {
                where: [{ senderId: In(firstRecipientId), receiverId: In(secondRecipientId), isAnonymous: In(anonParam), content: Like(queryParam) }
                    , { senderId: In(secondRecipientId), receiverId: In(firstRecipientId), isAnonymous: In(anonParam), content: Like(queryParam) }],
                order: { time: "DESC" },
                skip: skip,
                take: take
            });
    }

    async getPrivateMessageListBySenderId(skip: number, take: number, queryParam: string, anonParam: number[], firstRecipientId: number): Promise<PrivateMessage[]> {
        return await this.connection.manager
            .find(PrivateMessage, {
                where: { senderId: firstRecipientId, isAnonymous: In(anonParam), content: Like(queryParam) },
                order: { time: "DESC" },
                skip: skip,
                take: take
            });
    }

    async getPrivateMessageListByUserId(skip: number, take: number, queryParam: string, anonParam: number[], firstRecipientId: number): Promise<PrivateMessage[]> {
        return await this.connection.manager
            .find(PrivateMessage, {
                where: [{ senderId: firstRecipientId, isAnonymous: In(anonParam), content: Like(queryParam) },
                { receiverId: firstRecipientId, isAnonymous: In(anonParam), content: Like(queryParam) }],
                order: { time: "DESC" },
                skip: skip,
                take: take
            });
    }

    async getPrivateMessageListBySenderIdAndUserIdArray(skip: number, take: number, queryParam: string, anonParam: number[],
        firstRecipientId: number, secondRecipientId: number[]): Promise<PrivateMessage[]> {
        return await this.connection.manager
            .find(PrivateMessage, {
                where: { senderId: firstRecipientId, receiverId: In(secondRecipientId), isAnonymous: In(anonParam), content: Like(queryParam) },
                order: { time: "DESC" },
                skip: skip,
                take: take
            });
    }

    async getBySenderIdAndReceiverId(senderId: number, receiverId: number,time:Date): Promise<PrivateMessage[]> {
        return this.connection.manager
        .createQueryBuilder()
        .select("privateMessage")
        .from(PrivateMessage,"privateMessage")
        .where("privateMessage.time >= :time",{time:time})
        .andWhere("privateMessage.senderId=:senderid AND privateMessage.receiverId=:receiverid OR privateMessage.senderId=:receiverid AND privateMessage.receiverId=:senderid", {senderid:senderId,receiverid:receiverId})
        .getMany();
    }
}