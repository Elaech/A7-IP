import { IGroupePostOption } from "./IGroupePostOption";
import { GroupeRepository } from "../../Repositories/GroupeRepository";
import { PostRepository } from "../../Repositories/PostRepository";
import { Post } from "../../models/entities/Post";

export class GroupePostFaculty implements IGroupePostOption {

    private body: any;
    private userId: number;
    private title: string;
    private content: string;
    private isAnonymous: number;

    constructor(body: any, userId: number, title: string, content: string, isAnonymous: number) {
        this.body = body;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.isAnonymous = isAnonymous;
    }

    async createGroupePost(): Promise<void> {
        const groupeRepository = new GroupeRepository();
        const groupeTitle = this.body.groupe.year + this.body.groupe.letter + this.body.groupe.number;
        const groupeId: number = (await groupeRepository.getByTitle(groupeTitle))[0].id;

        const postRepository = new PostRepository();

        const newPost: Post = new Post();
        newPost.groupeId = groupeId;
        newPost.userId = this.userId;
        newPost.title = this.title;
        newPost.content = this.content;
        newPost.isAnonymous = this.isAnonymous;

        await postRepository.create(newPost);
    }

}
