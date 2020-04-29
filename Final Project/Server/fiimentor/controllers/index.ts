import {getAllUsers} from './userController'
import {login, register, registerRole} from './authController'
import {createPost, getPostByPostId,getPostList,getPrivateMessageByPrivateMessageId} from './postController'
import {tutorGroupeList} from "./tutorGroupeController";
import {getProfessorList} from './professorController'
import {getGroupeList} from "./groupeController";
export {getAllUsers, login, register, createPost, registerRole, getGroupeList,getProfessorList,tutorGroupeList,getPostByPostId,getPostList,getPrivateMessageByPrivateMessageId}
