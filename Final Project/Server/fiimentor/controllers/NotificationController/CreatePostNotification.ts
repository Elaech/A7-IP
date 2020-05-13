import {Post} from "../../models/entities/Post";
import {GroupeMemberRepository} from "../../Repositories/GroupeMemberRepository";
import {PostNotificationRepository} from "../../Repositories/PostNotificationRepository";
import {PostNotification} from "../../models/entities/PostNotification";

export class CreatePostNotification{
    static async createNotification(post : Post,userId: number):Promise<void>{
        const postId=post.id;
        const postGroupeId=post.groupeId;
        const groupeMemberRepository = new GroupeMemberRepository();
        const groupeMembers = await groupeMemberRepository.getByGroupeId(postGroupeId);
        const postNotificationRepository = new PostNotificationRepository();

        for (let temp of groupeMembers){
            if (temp.userId != userId) {
                const postNotification = new PostNotification();
                postNotification.postId = postId;
                postNotification.userId = temp.userId;
                await postNotificationRepository.create(postNotification);
            }
        }
    }
}