import {PostComment} from "../../models/entities/PostComment";
import {PostRepository} from "../../Repositories/PostRepository";
import {GroupeMemberRepository} from "../../Repositories/GroupeMemberRepository";
import {CommentNotificationRepository} from "../../Repositories/CommentNotificationRepository";
import {CommentNotification} from "../../models/entities/CommentNotification";

export class CreateCommentNotification{
    static async createNotification(comment : PostComment,userId: number):Promise<void>{
        const commentId = comment.id;
        const groupeId = (await (new PostRepository()).getById(comment.postId))[0].groupeId;
        const groupeMemberRepository = new GroupeMemberRepository();
        const groupeMembers = await groupeMemberRepository.getByGroupeId(groupeId);
        const commentNotificationRepository = new CommentNotificationRepository();

        for (let temp of groupeMembers){
            if (temp.userId != userId) {
                const commentNotification = new CommentNotification();
                commentNotification.postCommentId = commentId;
                commentNotification.userId = temp.userId;
                await commentNotificationRepository.create(commentNotification);
            }
        }
    }
}