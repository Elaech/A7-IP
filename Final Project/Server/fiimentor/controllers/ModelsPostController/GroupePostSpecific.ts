import { IGroupePostOption } from "./IGroupePostOption";
import { PostRepository } from "../../Repositories/PostRepository";
import { Post } from "../../models/entities/Post";

export class GroupePostSpecific implements IGroupePostOption {

    private groupeId: number;
    private userId: number;
    private title: string;
    private content: string;
    private isAnonymous: number;

    constructor(groupeId: number, userId: number, title: string, content: string, isAnonymous: number) {
        this.groupeId = groupeId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.isAnonymous = isAnonymous;
    }

    async createGroupePost(): Promise<void> {
        const postRepository = new PostRepository();

        const newPost: Post = new Post();
        newPost.groupeId = this.groupeId;
        newPost.userId = this.userId;
        newPost.title = this.title;
        newPost.content = this.content;
        newPost.isAnonymous = this.isAnonymous;

        await postRepository.create(newPost);
    }

}
