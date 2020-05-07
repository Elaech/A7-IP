
import {GroupeMember} from "../../models/entities/GroupeMember";

export class GetPostListOptions{
    queryParam: string;
    isAnonymous: boolean;
    postedByMe: boolean;
    post: boolean;
    userId: number;
    usersGroups : GroupeMember[];
    take : number;
    skip : number;
    usersGroupsId :number[];
    isAnonParam :number[];


    constructor(queryParam: string, isAnonymous: boolean, postedByMe: boolean, post: boolean, userId: number,
                usersGroups: GroupeMember[], take: number, skip: number, usersGroupsId: number[], isAnonParam: number[]) {
        this.queryParam = queryParam;
        this.isAnonymous = isAnonymous;
        this.postedByMe = postedByMe;
        this.post = post;
        this.userId = userId;
        this.usersGroups = usersGroups;
        this.take = take;
        this.skip = skip;
        this.usersGroupsId = usersGroupsId;
        this.isAnonParam = isAnonParam;
    }
}