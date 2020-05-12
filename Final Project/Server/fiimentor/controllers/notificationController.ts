import {INotificationPrivateMessage, INotificationComment, INotificationPost} from "./NotificationController/INotification";
import {PrivateMessageNotificationRepository} from "../Repositories/PrivateMessageNotificationRepository";
import {PrivateMessageNotification} from "../models/entities/PrivateMessageNotification";
import {CommentNotification} from "../models/entities/CommentNotification";
import {PostNotification} from "../models/entities/PostNotification";
import {CommentNotificationRepository} from "../Repositories/CommentNotificationRepository";
import {PostNotificationRepository} from "../Repositories/PostNotificationRepository";
import {PrivateMessage} from "../models/entities/PrivateMessage";
import {PostComment} from "../models/entities/PostComment";
import {Post} from "../models/entities/Post";
import {PostRepository} from "../Repositories/PostRepository";
import {PostCommentRepository} from "../Repositories/PostCommentRepository";
import {User} from "../models/entities/User";
import {UserRepository} from "../Repositories/UserRepository";
import {PrivateMessageRepository} from "../Repositories/PrivateMessageRepository";
import HttpStatus from "http-status-codes";


async function getNotification(req: any, res: any) {
    const userId = req.user.payload.id;
    const privateMessageNotificationRepository: PrivateMessageNotificationRepository = new PrivateMessageNotificationRepository();
    const commentNotificationRepository: CommentNotificationRepository = new CommentNotificationRepository();
    const postNotificationRepository: PostNotificationRepository = new PostNotificationRepository();
    const userRepository: UserRepository = new UserRepository();
    const postRepository: PostRepository = new PostRepository();
    const commentRepository: PostCommentRepository = new PostCommentRepository();
    const privateMessageRepository: PrivateMessageRepository = new PrivateMessageRepository();

    let pmEntity: PrivateMessage[];
    let commentEntity: PostComment[];
    let postEntity: Post[];
    let output: (INotificationPost | INotificationComment | INotificationPrivateMessage)[] = [];
    let user: User[];
    let length = 0;

    const pmNotification: PrivateMessageNotification[] = await privateMessageNotificationRepository.getUnseenPrivateMessageNotification(userId);
    const commentNotification: CommentNotification[] = await commentNotificationRepository.getUnseenCommentNotification(userId);
    const postNotification: PostNotification[] = await postNotificationRepository.getUnseenPostNotification(userId);

    for (let i = 0; i < pmNotification.length; i++) {
        user = await userRepository.getById(pmNotification[i].userId);
        pmEntity = await privateMessageRepository.getById(pmNotification[i].privateMessageID);
        output[length] = {
            pmessageID: pmEntity[0].id,
            author: `${user[0].firstName} ${user[0].lastName}`,
            timestamp: pmEntity[0].time
        }
        length++;
    }

    for (let i = 0; i < commentNotification.length; i++) {
        user = await userRepository.getById(commentNotification[i].userId);
        commentEntity = await commentRepository.getById(commentNotification[i].postCommentId);
        output[length] = {
            commentID: commentEntity[0].id,
            author: `${user[0].firstName} ${user[0].lastName}`,
            timestamp: commentEntity[0].time
        };
        length++;
    }

    for (let i = 0; i < postNotification.length; i++) {
        user = await userRepository.getById(postNotification[i].userId);
        postEntity = await postRepository.getById(postNotification[i].postId);
        output[length] = {
            title: postEntity[0].title,
            postID: postEntity[0].id,
            author: `${user[0].firstName} ${user[0].lastName}`,
            timestamp: postEntity[0].time
        }
        length++;
    }

    return res.status(HttpStatus.OK).json({
        totalPosts: length,
        posts: output
    });

}

const utils = {getNotification};

export = utils;