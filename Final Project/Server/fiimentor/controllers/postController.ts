import HttpStatus from 'http-status-codes'
import {GroupeRepository} from '../Repositories/GroupeRepository';
import {PostRepository} from '../Repositories/PostRepository';
import {Post} from '../models/entities/Post';
import {PrivateMessageRepository} from '../Repositories/PrivateMessageRepository';
import {GroupeMemberRepository} from '../Repositories/GroupeMemberRepository';
import {UserRepository} from '../Repositories/UserRepository';
import {PostAll} from './ModelsPostController/PostAll';
import {PostCreator} from './ModelsPostController/PostCreator';
import {ProfessorsPostAll} from './ModelsPostController/ProfessorsPostAll';
import {PostProfessors} from './ModelsPostController/PostProfessors';
import {ProfessorsPostProfessor} from './ModelsPostController/ProfessorsPostProfessor';
import {ProfessorsPostTutor} from './ModelsPostController/ProfessorsPostTutor';
import {GroupePostSpecific} from './ModelsPostController/GroupePostSpecific';
import {PostGroupe} from './ModelsPostController/PostGroupe';
import {GroupePostFaculty} from './ModelsPostController/GroupePostFaculty';
import {GetPostListOptions} from "./GetPostController/GetPostListOptions";
import {ToFromAll} from "./GetPostController/ToFromAll";
import {ToFromGroupe} from "./GetPostController/ToFromGroupe";
import {ToFromAllProfessors} from "./GetPostController/ToFromAllProfessors";
import {ToFromSpecificProfessor} from "./GetPostController/ToFromSpecificProfessor";
import {ToFromTutorProfessor} from "./GetPostController/ToFromTutorProfessor";
import { PostCommentRepository } from '../Repositories/PostCommentRepository';
import { PostComment } from '../models/entities/PostComment';
import { CommentModel } from './ModelsPostController/CommentModel';
import { PostNotificationRepository } from '../Repositories/PostNotificationRepository';
import { PrivateMessage } from '../models/entities/PrivateMessage';
import { User } from '../models/entities/User';
import { PrivateMessageNotificationRepository } from '../Repositories/PrivateMessageNotificationRepository';
import { CommentNotificationRepository } from '../Repositories/CommentNotificationRepository';


async function createPost(req: any, res: any) {

    if (req.user.payload.role === 'professor') {
        req.body.isAnonymous = false;
    }

    const body = req.body;
    const userId = req.user.payload.id;
    const content = body.content.trim();
    const isAnonymous = body.isAnonymous;
    const title = body.title.trim();

    const option = (body.recipients === 'All') ?
        'All' : (body.recipients === 'Professors') ?
            'Professors' : 'Groupe';


    try {

        switch (option) {
            case 'All': {

                const postAllOption: PostAll = new PostAll(body, userId);
                const postCreator: PostCreator = new PostCreator(postAllOption);
                postCreator.createPost();

                return res.status(HttpStatus.CREATED).json({
                    succes: true
                })
            }
            case 'Professors': {

                const professorOption = (body.professors.recipient === 'All')
                    ? 'All' : (body.professors.recipient === 'Professor')
                        ? 'Professor' : 'Tutor';

                switch (professorOption) {
                    case 'All': {
                        const professorsPostAll: ProfessorsPostAll = new ProfessorsPostAll(body, userId);
                        const postProfessorsOption: PostProfessors = new PostProfessors(professorsPostAll);
                        const postCreator: PostCreator = new PostCreator(postProfessorsOption);
                        postCreator.createPost();

                        return res.status(HttpStatus.CREATED).json({
                            succes: true
                        })
                    }
                    case 'Professor': {
                        const professorsPostProfessor: ProfessorsPostProfessor = new ProfessorsPostProfessor(body, userId, title, content, isAnonymous);
                        const postProfessorsOption: PostProfessors = new PostProfessors(professorsPostProfessor);
                        const postCreator: PostCreator = new PostCreator(postProfessorsOption);
                        postCreator.createPost();

                        return res.status(HttpStatus.CREATED).json({
                            succes: true
                        })
                    }

                    case 'Tutor': {
                        const professorsPostTutor: ProfessorsPostTutor = new ProfessorsPostTutor(req, userId, title, content, isAnonymous);
                        const postProfessorsOption: PostProfessors = new PostProfessors(professorsPostTutor);
                        const postCreator: PostCreator = new PostCreator(postProfessorsOption);
                        postCreator.createPost();

                        return res.status(HttpStatus.CREATED).json({
                            succes: true
                        })

                    }
                }
            }
            case 'Groupe': {
                if (req.body.groupe.groupeId) {
                    const groupeId: number = req.body.groupe.groupeId;

                    const groupePostSpecific: GroupePostSpecific = new GroupePostSpecific(groupeId, userId, title, content, isAnonymous);
                    const postGroupeOption: PostGroupe = new PostGroupe(groupePostSpecific);
                    const postCreator: PostCreator = new PostCreator(postGroupeOption);
                    postCreator.createPost();

                    return res.status(HttpStatus.CREATED).json({
                        succes: true
                    })

                } else {

                    const groupePostFaculty: GroupePostFaculty = new GroupePostFaculty(body, userId, title, content, isAnonymous);
                    const postGroupeOption: PostGroupe = new PostGroupe(groupePostFaculty);
                    const postCreator: PostCreator = new PostCreator(postGroupeOption);
                    postCreator.createPost();

                    return res.status(HttpStatus.CREATED).json({
                        succes: true
                    })

                }
            }
        }
    } catch (error) {
        console.log(error);

        return res.status(HttpStatus.BAD_REQUEST).json({
            succes: false,
            message: error
        })
    }

}


async function createPostAll(body: any, userId: number, groupeTitle: string) {
    const isAnonymous = body.isAnonymous;
    const title = body.title.trim();
    const content = body.content.trim();

    const groupeRepository = new GroupeRepository();
    const groupeId: number = (await groupeRepository.getByTitle(groupeTitle))[0].id;

    const postRepository = new PostRepository();

    const newPost: Post = new Post();
    newPost.groupeId = groupeId;
    newPost.userId = userId;
    newPost.title = title;
    newPost.content = content;
    newPost.isAnonymous = isAnonymous;

    await postRepository.create(newPost);

}


async function getPostList(req: any, res: any) {

    let queryParam: string;
    if (req.body.queryParam) queryParam = `%${req.body.queryParam}%`;
    else queryParam = "%";
    const groupeMemberRepository = new GroupeMemberRepository();
    const usersGroups = await groupeMemberRepository.getByUserId(req.user.payload.id);
    const usersGroupsId = usersGroups.map(temp => temp.groupeId);
    const getPostOptions = new GetPostListOptions(queryParam, req.body.isAnonymous, req.body.postedByMe, req.body.post, req.user.payload.id,
        usersGroups, req.body.size, (req.body.page - 1) * req.body.size, usersGroupsId, (req.body.isAnonymous ? [1] : [0, 1]));
    const toFromOption = req.body.toFrom;

    switch (toFromOption) {
        case 'All':
            return res.status(HttpStatus.OK).json(await ToFromAll.postsToFromAll(getPostOptions));
        case 'Groupe':
            const groupeId = req.body.groupe.groupeId;
            if (usersGroups.some(x => x.groupeId === groupeId)) {
                return res.status(HttpStatus.OK).json(await ToFromGroupe.postsToFromGroupe(getPostOptions, groupeId));
            } else {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'You do not have the right permissions to view posts from this group.'
                });
            }
        case 'Professors':

            switch (req.body.professors.recipient) {
                case 'All':
                    return res.status(HttpStatus.OK).json(await ToFromAllProfessors.allProfessors(getPostOptions, req.user.payload.role));
                case 'Professor':
                    const professorId = req.body.professors.professorId;
                    return res.status(HttpStatus.OK).json(await ToFromSpecificProfessor.specificProfessor(getPostOptions, professorId));
                case 'Tutor':
                    if (req.user.payload.role === 'student') {
                        return res.status(HttpStatus.OK).json(await ToFromTutorProfessor.tutorWhenUserIsStudent(getPostOptions));
                    } else if (req.user.payload.role === 'professor') {
                        return res.status(HttpStatus.OK).json(await ToFromTutorProfessor.tutorWhenUserIsProfessor(getPostOptions));
                    }
                    break;
            }
            break;
    }
    return res.status(HttpStatus.BAD_REQUEST).json({
        succes: false
    });
}


async function getPostByPostId(req: any, res: any) {
    const postId: number = req.params.postId;
    const userId: number = req.user.payload.id;

    const postRepository = new PostRepository();
    const post = await postRepository.getById(postId);

    if (!post.length) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            succes: false,
            status: "The post does not exist."
        })
    }

    const groupeMemberRepository = new GroupeMemberRepository();
    const groupeMember = await groupeMemberRepository.getByUserIdAndGroupeId(userId, post[0].groupeId);

    if (groupeMember.length) {

        const userRepository = new UserRepository();
        const user = await userRepository.getById(userId);

        const lastName: string = user[0].lastName;
        const firstName: string = user[0].firstName;

        const groupeRepository = new GroupeRepository();
        const groupe = await groupeRepository.getById(post[0].groupeId);

        const response = {
            succes: true,
            title: post[0].title,
            content: post[0].content,
            author: "",
            timestamp: post[0].time,
            isAnonymous: post[0].isAnonymous,
            groupeTitle: groupe[0].title
        }

        post[0].isAnonymous ? response.author = "author" : response.author = `${lastName} ${firstName}`;

        const postCommentRepository = new PostCommentRepository();
        const comments:PostComment[] = await postCommentRepository.getByPostId(postId);
        
        const commentsResponse:CommentModel[] = [];
        let index:number = 0;
        const commentNotificationRepository = new CommentNotificationRepository();

        while(index<comments.length) {
            const comment:PostComment = comments[index];
            let commentAuthor:string|null = null;

            if(!comment.isAnonymous) {
                const user:User = (await userRepository.getById(comment.userId))[0];
                commentAuthor = `${user.lastName} ${user.firstName}`;
            }
            const commentModel:CommentModel = new CommentModel(commentAuthor,comment.content,comment.time,comment.isAnonymous);
            commentsResponse.push(commentModel);

            await commentNotificationRepository.updateSeen(userId,comment.id);

            index++;
        }


        const postNotificationRepository = new PostNotificationRepository();
        await postNotificationRepository.updateSeen(userId,postId);


        return res.status(HttpStatus.OK).json({
            "succes": true,
            "title": response.title,
            "content": response.content,
            "author": response.author,
            "timestamp": response.timestamp,
            "isAnonymous": response.isAnonymous,
            "groupeTitle": response.groupeTitle,
            "comments" : commentsResponse
        });

    } else {
        return res.status(HttpStatus.FORBIDDEN).json({
            succes: false,
            status: "You do not have the right permissions to view this post."
        })
    }

}

async function getPrivateMessageByPrivateMessageId(req: any, res: any) {
    const pMessagetId: number = req.params.pMessageId;
    const userId: number = req.user.payload.id;


    const privateMessageRepository = new PrivateMessageRepository();
    const pMessage = await privateMessageRepository.getById(pMessagetId);

    if (!pMessage.length) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            succes: false,
            status: "The post does not exist."
        })
    }

    if (pMessage[0].senderId === userId || pMessage[0].receiverId === userId) {

        const userRepository = new UserRepository();
        let user = await userRepository.getById(pMessage[0].receiverId);

        const index: number = pMessage[0].content.indexOf('\n');
        const title: string = pMessage[0].content.substring(0, index);
        const content: string = pMessage[0].content.substring(index + 1);

        const response = {
            success: true,
            title: title,
            content: content,
            author: "",
            receiver: `${user[0].lastName} ${user[0].firstName}`,
            timestamp: pMessage[0].time,
            IsAnonymous: pMessage[0].isAnonymous
        }
        user = await userRepository.getById(pMessage[0].senderId);
        pMessage[0].isAnonymous ? response.author = "Anonymous" : response.author = `${user[0].lastName} ${user[0].firstName}`;


        const comments:PrivateMessage[] = await privateMessageRepository.getBySenderIdAndReceiverId(pMessage[0].senderId,pMessage[0].receiverId, pMessage[0].time);
        const commentsResponse:CommentModel[] = [];
        let indexx:number = 0;

        while(indexx<comments.length) {
            const comment:PrivateMessage = comments[indexx];
            let commentAuthor:string|null = null;

            if(!comment.isAnonymous) {
                const newUser:User = (await userRepository.getById(comment.senderId))[0];
                commentAuthor = `${newUser.lastName} ${newUser.firstName}`;
            }
            const commentModel:CommentModel = new CommentModel(commentAuthor,comment.content,comment.time,comment.isAnonymous);
            commentsResponse.push(commentModel);

            indexx++;
        }

        const privateMessageNotificationRepository = new PrivateMessageNotificationRepository();
        await privateMessageNotificationRepository.updateSeen(pMessage[0].receiverId,pMessage[0].senderId);

        return res.status(HttpStatus.OK).json({
            "succes": true,
            "title": response.title,
            "content": response.content,
            "author": response.author,
            "timestamp": response.timestamp,
            "isAnonymous": response.IsAnonymous,
            "comments" : commentsResponse
        });


    } else {
        return res.status(HttpStatus.FORBIDDEN).json({
            succes: false,
            status: "You do not have the right permissions to view this post."
        })
    }
}


export {createPost, getPostByPostId, getPostList, getPrivateMessageByPrivateMessageId, createPostAll}
