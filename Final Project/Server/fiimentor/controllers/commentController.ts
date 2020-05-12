import HttpStatus from "http-status-codes";
import { PostIDComment } from "./ModelsCommentController/PostIdComment";
import { CommentCreator } from "./ModelsPostController/CommentCreator";
import { PrivateMessageIDComment } from "./ModelsCommentController/PrivateMessageIdComment";

async function createComment(req: any, res: any) {
    const body = req.body;
    const postID: number = body.postID;
    const pmessageID: number = body.pmessageID;
    const content: string = body.content;
    const isAnonymous: number = body.isAnonymous;
    const userId: number = req.user.payload.id;

    try {
        if (pmessageID === null) {

            const postIdComment: PostIDComment = new PostIDComment(userId, postID, content, isAnonymous);
            const commentCreator: CommentCreator = new CommentCreator(postIdComment);
            commentCreator.createComment();

            return res.status(HttpStatus.OK).json({
                succes: true
            });

        } else if (postID === null) {
            const privateMessageIdComment: PrivateMessageIDComment = new PrivateMessageIDComment(userId, pmessageID, content, isAnonymous);
            const commentCreator: CommentCreator = new CommentCreator(privateMessageIdComment);
            commentCreator.createComment();

            return res.status(HttpStatus.OK).json({
                succes: true
            });
        }
    } catch (error) {
        console.log(error);
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
        succes: false,
        status: "The comment could not be created."
    });

}

export { createComment }