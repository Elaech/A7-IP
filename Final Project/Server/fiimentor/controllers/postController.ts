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
import {getPostListOptions} from "./GetPostController/getPostListOptions";
import {toFromAll} from "./GetPostController/toFromAll";
import {toFromGroupe} from "./GetPostController/toFromGroupe";
import {toFromAllProfessors} from "./GetPostController/toFromAllProfessors";
import {toFromSpecificProfessor} from "./GetPostController/toFromSpecificProfessor";
import {toFromTutorProfessor} from "./GetPostController/toFromTutorProfessor";


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
    const getPostOptions = new getPostListOptions(queryParam, req.body.isAnonymous, req.body.postedByMe, req.body.post, req.user.payload.id,
        usersGroups, req.body.size, (req.body.page - 1) * req.body.size, usersGroupsId, (req.body.isAnonymous ? [1] : [0, 1]));
    const toFromOption = req.body.toFrom;

    switch (toFromOption) {
        case 'All':
            return res.status(HttpStatus.OK).json(await toFromAll.postsToFromAll(getPostOptions));
        case 'Groupe':
            const groupeId = req.body.groupe.groupeId;
            if (usersGroups.some(x => x.groupeId === groupeId)) {
                return res.status(HttpStatus.OK).json(await toFromGroupe.postsToFromGroupe(getPostOptions, groupeId));
            } else {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'Nu aveti permisiunea sa vedeti mesajele din aceasta grupa'
                });
            }
        case 'Professors':

            switch (req.body.professors.recipient) {
                case 'All':
                    return res.status(HttpStatus.OK).json(await toFromAllProfessors.allProfessors(getPostOptions, req.user.payload.role));
                case 'Professor':
                    const professorId = req.body.professors.professorId;
                    return res.status(HttpStatus.OK).json(await toFromSpecificProfessor.specificProfessor(getPostOptions, professorId));
                case 'Tutor':
                    if (req.user.payload.role === 'student') {
                        return res.status(HttpStatus.OK).json(await toFromTutorProfessor.tutorWhenUserIsStudent(getPostOptions));
                    } else if (req.user.payload.role === 'professor') {
                        return res.status(HttpStatus.OK).json(await toFromTutorProfessor.tutorWhenUserIsProfessor(getPostOptions));
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
    const postId: number = req.postId;
    const userId: number = req.user.payload.id;

    const postRepository = new PostRepository();
    const post = await postRepository.getById(postId);

    if (!post.length) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            succes: false,
            message: "The post does not exist."
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

        return res.status(HttpStatus.OK).json(response);

    } else {
        return res.status(HttpStatus.FORBIDDEN).json({
            succes: false,
            message: "You do not have the right permissions to view this post."
        })
    }

}

async function getPrivateMessageByPrivateMessageId(req: any, res: any) {
    const pMessagetId: number = req.pMessageId;
    const userId: number = req.user.payload.id;


    const privateMessageRepository = new PrivateMessageRepository();
    const pMessage = await privateMessageRepository.getById(pMessagetId);

    if (!pMessage.length) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            succes: false,
            message: "The post does not exist."
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

        return res.status(HttpStatus.OK).json(response);

    } else {
        return res.status(HttpStatus.FORBIDDEN).json({
            succes: false,
            message: "You do not have the right permissions to view this post."
        })
    }
}


export {createPost, getPostByPostId, getPostList, getPrivateMessageByPrivateMessageId, createPostAll}
