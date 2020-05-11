import { IComment } from "./IComment";
import { PostCommentRepository } from "../../Repositories/PostCommentRepository";
import { PostComment } from "../../models/entities/PostComment";

export class PostIDComment implements IComment {

    private userId: number;
    private postID: number;
    private content: string;
    private isAnonymous: number;

    constructor(userId: number,
        postID: number,
        content: string,
        isAnonymous: number
    ) {
        this.userId = userId;
        this.postID = postID;
        this.content = content;
        this.isAnonymous = isAnonymous;
    }

    async createComment(): Promise<void> {
        const postCommentRepository = new PostCommentRepository();
        const newPostComment: PostComment = new PostComment();
        newPostComment.userId = this.userId;
        newPostComment.postId = this.postID;
        newPostComment.content = this.content;
        newPostComment.isAnonymous = this.isAnonymous;

        await postCommentRepository.create(newPostComment);
    }

}