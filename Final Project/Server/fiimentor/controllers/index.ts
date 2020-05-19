import {getAllUsers} from './userController'
import {createPost, getPostByPostId,getPostList,getPrivateMessageByPrivateMessageId} from './postController'
import {tutorGroupeList} from "./tutorGroupeController";
import {getProfessorList} from './professorController'
import {getGroupeList} from "./groupeController";
import {createComment} from "./commentController"
import {getNotification} from './notificationController'

export {getAllUsers, createPost,  getGroupeList,getProfessorList,tutorGroupeList,
    getPostByPostId,getPostList,getPrivateMessageByPrivateMessageId,createComment,getNotification}
