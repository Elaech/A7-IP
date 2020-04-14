import HttpStatus from 'http-status-codes'
import { GroupeRepository } from '../Repositories/GroupeRepository';
import { PostRepository } from '../Repositories/PostRepository';
import { Post } from '../models/entities/Post';
import { ProfessorRepository } from '../Repositories/ProfessorRepository';
import { PrivateMessageRepository } from '../Repositories/PrivateMessageRepository';
import { PrivateMessage } from '../models/entities/PrivateMessage';
import { Groupe } from '../models/entities/Groupe';

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
            message:error
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

export { createPost }