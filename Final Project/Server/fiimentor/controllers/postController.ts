import HttpStatus from 'http-status-codes'
import { GroupeRepository } from '../Repositories/GroupeRepository';
import { PostRepository } from '../Repositories/PostRepository';
import { Post } from '../models/entities/Post';
import { ProfessorRepository } from '../Repositories/ProfessorRepository';
import { PrivateMessageRepository } from '../Repositories/PrivateMessageRepository';
import { PrivateMessage } from '../models/entities/PrivateMessage';
import { GroupeMemberRepository } from '../Repositories/GroupeMemberRepository';
import { UserRepository } from '../Repositories/UserRepository';
import { response } from 'express';

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

        if (option === 'All') {

            await createPostAll(body, userId, 'allUsers');

            return res.status(HttpStatus.CREATED).json({
                succes: true
            })

        } else if (option === 'Professors') {

            const professorOption = (body.professors.recipient === 'All')
                ? 'All' : (body.professors.recipient === 'Professor')
                    ? 'Professor' : 'Tutor';


            if (professorOption === 'All') {

                await createPostAll(body, userId, 'allProfessors');

                return res.status(HttpStatus.CREATED).json({
                    succes: true
                })

            } else if (professorOption === 'Professor') {

                const professorRepository = new ProfessorRepository();
                const professorId = body.professors.professorId;
                const professorUserId: number = (await professorRepository.getById(professorId))[0].userId;

                const privateMessageRepository = new PrivateMessageRepository();
                const newPrivateMessage: PrivateMessage = new PrivateMessage();
                newPrivateMessage.senderId = userId;
                newPrivateMessage.receiverId = professorUserId;
                newPrivateMessage.content = title + '\n' + content;
                newPrivateMessage.isAnonymous = isAnonymous;

                await privateMessageRepository.create(newPrivateMessage);

                return res.status(HttpStatus.CREATED).json({
                    succes: true
                })

            } else {
                const tutorId = req.user.payload.tutorId;

                const privateMessageRepository = new PrivateMessageRepository();
                const newPrivateMessage: PrivateMessage = new PrivateMessage();

                newPrivateMessage.senderId = userId;
                newPrivateMessage.receiverId = tutorId;
                newPrivateMessage.content = title + '\n' + content;
                newPrivateMessage.isAnonymous = isAnonymous;

                await privateMessageRepository.create(newPrivateMessage);

                return res.status(HttpStatus.CREATED).json({
                    succes: true
                })

            }

        } else {

            if (req.body.groupe.groupeId) {

                const postRepository = new PostRepository();

                const newPost: Post = new Post();
                newPost.groupeId = req.body.groupe.groupeId;
                newPost.userId = userId;
                newPost.title = title;
                newPost.content = content;
                newPost.isAnonymous = isAnonymous;

                await postRepository.create(newPost);

                return res.status(HttpStatus.CREATED).json({
                    succes: true
                })

            } else {

                const groupeRepository = new GroupeRepository();
                const groupeTitle = body.groupe.year + body.groupe.letter + body.groupe.number;
                const groupeId: number = (await groupeRepository.getByTitle(groupeTitle))[0].id;

                const postRepository = new PostRepository();

                const newPost: Post = new Post();
                newPost.groupeId = groupeId;
                newPost.userId = userId;
                newPost.title = title;
                newPost.content = content;
                newPost.isAnonymous = isAnonymous;

                await postRepository.create(newPost);

                return res.status(HttpStatus.CREATED).json({
                    succes: true
                })

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



async function getPostByPostId(req: any, res: any) {
    const postId: number = req.params.postId;
    const userId: number = req.user.payload.id;

    const postRepository = new PostRepository();
    const post = await postRepository.getById(postId);

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
    const pMessagetId: number = req.params.pMessageId;
    const userId: number = req.user.payload.id;

    const privateMessageRepository = new PrivateMessageRepository();
    const pMessage = await privateMessageRepository.getById(pMessagetId);

    if(pMessage[0].senderId === userId || pMessage[0].receiverId === userId){

        const userRepository = new UserRepository();
        let user = await userRepository.getById(pMessage[0].receiverId);

        const index: number = pMessage[0].content.indexOf('\n');
        const title: string= pMessage[0].content.substring(0,index);
        const content: string = pMessage[0].content.substring(index+1);

        const response = {
            success: true,
            title : title,
            content: content,
            author : "",
            receiver: `${user[0].lastName} ${user[0].firstName}`,
            timestamp : pMessage[0].time,
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


export { createPost, getPostByPostId, getPrivateMessageByPrivateMessageId }