import { IComment } from "../ModelsCommentController/IComment";

export class CommentCreator {
    private IComment: IComment;

    constructor(Icomment: IComment) {
        this.IComment = Icomment;
    }

    async  createComment(): Promise<void> {
        await this.IComment.createComment();
    }
}
