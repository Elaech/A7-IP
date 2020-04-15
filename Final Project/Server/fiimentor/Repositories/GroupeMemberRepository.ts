import { ReadWriteRepository } from "./ReadWriteRepository";
import { GroupeMember } from "../models/entities/GroupeMember";

export class GroupeMemberRepository extends ReadWriteRepository<GroupeMember> {
    constructor() {
        super(GroupeMember);
    }
}