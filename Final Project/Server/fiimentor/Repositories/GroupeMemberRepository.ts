import { ReadWriteRepository } from "./ReadWriteRepository";
import { GroupeMember } from "../models/entities/GroupeMember";

export class GroupeMemberRepository extends ReadWriteRepository<GroupeMember> {
    constructor() {
        super(GroupeMember);
    }

    async  getByUserIdAndGroupeId(userId:number,groupeId:number):Promise<GroupeMember[]> {
        return await this.connection.manager
            .find(GroupeMember, {where: {userId:userId, groupeId:groupeId}});
    }

    async getByUserId(userId:number):Promise<GroupeMember[]>{
        return await this.connection.manager
            .find(GroupeMember, {where: {userId:userId}});
    }

    async getByGroupeId(groupeId:number):Promise<GroupeMember[]>{
        return await this.connection.manager
            .find(GroupeMember, {where: {groupeId:groupeId}});
    }
}