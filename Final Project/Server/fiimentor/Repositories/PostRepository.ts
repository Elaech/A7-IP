import { ReadWriteRepository } from "./ReadWriteRepository";
import { Post } from "../models/entities/Post";
import {In, Like} from "typeorm";

export class PostRepository extends ReadWriteRepository<Post> {

    constructor() {
        super(Post);
    }

    async getPostListByUserIdAndGroupe(skip:number,take:number,queryParam:string,anonParam:number[],userId:number[],groupeId:number[]):Promise<Post[]>{
        return await this.connection.manager
            .find(Post , {
                where:{userId: In(userId),groupeId: In(groupeId),isAnonymous: In(anonParam) ,content: Like(queryParam)},
                order:{time:"DESC"},
                skip:skip,
                take:take});
    }

    async countPostListByUserIdAndGroupe(queryParam:string,anonParam:number[],userId:number[],groupeId:number[]):Promise<[Post[], number]>{
        return await this.connection.manager
            .findAndCount(Post , {
                where:{userId: In(userId),groupeId: In(groupeId),isAnonymous: In(anonParam) ,content: Like(queryParam)},
                order:{time:"DESC"},
            });
    }

    async getPostListByGroupe(skip:number,take:number,queryParam:string,anonParam:number[],groupeId:number):Promise<Post[]>{
        return await this.connection.manager
            .find(Post , {
                where:{groupeId: groupeId,isAnonymous: In(anonParam),content: Like(queryParam)},
                order:{time:"DESC"},
                skip:skip,
                take:take});
    }

    async countPostListByGroupe(queryParam:string,anonParam:number[],groupeId:number):Promise<[Post[], number]>{
        return await this.connection.manager
            .findAndCount(Post , {
                where:{groupeId: groupeId,isAnonymous: In(anonParam),content: Like(queryParam)},
                order:{time:"DESC"},
                });
    }

    async getPostListByUserId(skip:number,take:number,queryParam:string,anonParam:number[],userId:number):Promise<Post[]>{
        return await this.connection.manager
            .find(Post , {
                where:{userId: userId,isAnonymous: In(anonParam),content: Like(queryParam)},
                order:{time:"DESC"},
                skip:skip,
                take:take});
    }

    async countPostListByUserId(queryParam:string,anonParam:number[],userId:number):Promise<[Post[], number]>{
        return await this.connection.manager
            .findAndCount(Post , {
                where:{userId: userId,isAnonymous: In(anonParam),content: Like(queryParam)},
                order:{time:"DESC"},
            });
    }

    async getAllPostList(skip:number,take:number,queryParam:string,anonParam:number[],userId:number,groupeId:number[]):Promise<Post[]>{
        return await this.connection.manager
            .find(Post , {
                where:[{userId: userId,isAnonymous: In(anonParam),content: Like(queryParam)},
                    {groupeId: In(groupeId),isAnonymous: In(anonParam),content: Like(queryParam)}],
                order:{time:"DESC"},
                skip:skip,
                take:take});
    }

    async countAllPostList(queryParam:string,anonParam:number[],userId:number,groupeId:number[]):Promise<[Post[], number]>{
        return await this.connection.manager
            .findAndCount(Post , {
                where:[{userId: userId,isAnonymous: In(anonParam),content: Like(queryParam)},
                    {groupeId: In(groupeId),isAnonymous: In(anonParam),content: Like(queryParam)}],
                order:{time:"DESC"},
                });
    }
}