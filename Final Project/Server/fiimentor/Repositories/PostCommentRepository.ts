import { ReadWriteRepository } from "./ReadWriteRepository";
import { PostComment } from "../models/entities/PostComment";

export class PostCommentRepository extends ReadWriteRepository<PostComment> {
    constructor() {
        super(PostComment);
    }

    async getByPostId(postId: number): Promise<PostComment[]> {
        return await this.connection.manager
            .find(PostComment, { where: { postId: postId } });
    }

    async getLatestCommentByUserId(userId : number): Promise<PostComment[]>{
        return await this.connection.manager
            .find(PostComment,{
                where: {userId: userId},
                order: {time:"DESC"},
                take: 1
            });
    }
}