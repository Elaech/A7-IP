import HttpStatus from 'http-status-codes'
import { GroupeRepository } from '../Repositories/GroupeRepository';
import { PostRepository } from '../Repositories/PostRepository';
import { Post } from '../models/entities/Post';
import { ProfessorRepository } from '../Repositories/ProfessorRepository';
import { PrivateMessageRepository } from '../Repositories/PrivateMessageRepository';
import { PrivateMessage } from '../models/entities/PrivateMessage';
import { GroupeMemberRepository } from '../Repositories/GroupeMemberRepository';
import { UserRepository } from '../Repositories/UserRepository';
import {query, response} from 'express';
import {User} from "../models/entities/User";
import {TutorRepository} from "../Repositories/TutorRepository";
import {StudentRepository} from "../Repositories/StudentRepository";

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



async function getPostList(req:any, res: any){

    interface postResult{
        title: string;
        postId: number;
        author: string;
        groupeId: number;
        timestamp: Date;
    }

    interface privateMessageResult{
        title: string;
        pmessageId: number;
        author: string;
        timestamp: Date;
    }

    async function postOutput(posts: Post[]):Promise<postResult[]>{
        let finalOutput: postResult[] = [];
        const userRepository = new UserRepository();
        for (let i = 0; i < posts.length; i++) {
            const user = (await userRepository.getById(posts[i].userId))[0];
            const author = `${user.firstName} ${user.lastName}`
            finalOutput[i] = {
                title: posts[i].title,
                postId: posts[i].id,
                author: author,
                groupeId: posts[i].groupeId,
                timestamp: posts[i].time!
            }
        }
        return finalOutput;
    }
    async function pmOutput(pms: PrivateMessage[]):Promise<privateMessageResult[]>{
        let finalOutput: privateMessageResult[] = [];
        const userRepository = new UserRepository();
        for (let i = 0; i < pms.length; i++) {
            const user = (await userRepository.getById(pms[i].senderId))[0];
            const author = `${user.firstName} ${user.lastName}`
            finalOutput[i] = {
                title: "",
                pmessageId: pms[i].id,
                author: author,
                timestamp: pms[i].time!
            }
        }
        return finalOutput;
    }

    let queryParam : string;
    if (req.body.queryParam) queryParam=`%${req.body.queryParam}%`;
    else queryParam="%";
    const isAnonymous : boolean =req.body.isAnonymous;
    const postedByMe : boolean =req.body.postedByMe;
    const post : boolean = req.body.post;
    const userId=req.user.payload.id;
    const groupeMemberRepository = new GroupeMemberRepository();
    const usersGroups = await groupeMemberRepository.getByUserId(userId);
    const take = req.body.size;
    const skip = (req.body.page-1)*take;
    const usersGroupsId =  usersGroups.map(temp=>temp.groupeId);
    const isAnonParam = isAnonymous ? [1] : [0,1];
    const postedByMeParam : string = postedByMe ? '${userId}' : '%';

    const postRepository = new PostRepository();
    const privateMessageRepository = new PrivateMessageRepository();
    if (req.body.toFrom === 'All'){
        if (post) {
            const output =(postedByMe ? (await postRepository.getPostListByUserId(skip, take, queryParam, isAnonParam, userId))
                : (await postRepository.getAllPostList(skip, take, queryParam, isAnonParam, userId, usersGroupsId)));
            return res.status(HttpStatus.OK).json(await postOutput(output));
        }
        else{
            const output =(postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderId(skip,take,queryParam,isAnonParam,userId))
                :(await privateMessageRepository.getPrivateMessageListByUserId(skip,take,queryParam,isAnonParam,userId)));
            return res.status(HttpStatus.OK).json(await pmOutput(output));
        }
    }

    if (req.body.toFrom === 'Groupe') {
        const groupeId = req.body.groupe.groupeId;
        if (usersGroups.some(x => x.groupeId === groupeId)) {
            const groupeMemberRepository = new GroupeMemberRepository();
            const groupeMemberUserId =(await groupeMemberRepository.getByGroupeId(groupeId)).map(temp=>temp.userId);
            if (post){
                const output =(postedByMe ? (await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,[userId],[groupeId]))
                    :(await postRepository.getPostListByGroupe(skip,take,queryParam,isAnonParam,groupeId)))
                return res.status(HttpStatus.OK).json(await postOutput(output));
            }
            else{
                const output = (postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(skip,take,queryParam,isAnonParam,userId,groupeMemberUserId))
                    :(await privateMessageRepository.getPrivateMessageList(skip,take,queryParam,isAnonParam,[userId],groupeMemberUserId)));
                return res.status(HttpStatus.OK).json(await pmOutput(output));
            }
        } else {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'Nu aveti permisiunea sa vedeti mesajele din aceasta grupa'
                });
        }
    }
    if (req.body.toFrom === 'Professors'){
       const professorRepository = new ProfessorRepository();


       if (req.body.professors.recipient === 'All'){
           const professors = await professorRepository.getAll();
           const groupeRepository = new GroupeRepository();
           const professorsUserId = professors.map(temp=>temp.userId);
           const professorsGroupeId = (await groupeRepository.getByTitle("allProfessors"))[0].id;


           const postsByProfs = (req.user.payload.role === "student") ?
               (postedByMe ? [] : await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,professorsUserId,usersGroupsId))
               :(postedByMe ? (await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,[userId],usersGroupsId))
                   : (await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,professorsUserId,usersGroupsId)));
           const myPostsForProfs = (req.user.payload.role === "student") ?
               (await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,[userId],[professorsGroupeId])):[];
           const posts=postsByProfs.concat(myPostsForProfs);
           posts.sort((a,b)=>a.time!.getTime() > b.time!.getTime() ? 1 : -1);
           if (post) {
               const output =posts;
               return res.status(HttpStatus.OK).json(await postOutput(output));
           }
           else{
               const output =(postedByMe ? await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(skip,take,queryParam,isAnonParam,userId,professorsUserId)
                   : await privateMessageRepository.getPrivateMessageList(skip,take,queryParam,isAnonParam,[userId],professorsUserId));
               return res.status(HttpStatus.OK).json(await pmOutput(output));
           }
       }
       if (req.body.professors.recipient === 'Professor'){
           const professorId=req.body.professors.professorId;
           if (post) {
               const output =(postedByMe ? [] : (await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,[professorId],usersGroupsId)));
               return res.status(HttpStatus.OK).json(await postOutput(output));
           }
           else{
               const output =(postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(skip,take,queryParam,isAnonParam,userId,[professorId]))
                   :(await privateMessageRepository.getPrivateMessageList(skip,take,queryParam,isAnonParam,[userId],[professorId])));
               return res.status(HttpStatus.OK).json(await pmOutput(output));
           }
       }
       if (req.body.professors.recipient === 'Tutor'){
           if (req.user.payload.role === 'student'){
               const studentRepository = new StudentRepository();
               let tutorId=(await studentRepository.getByUserId(userId))[0].tutorId;
               if(tutorId == null) tutorId=0;
               if (post) {
                   const output =(postedByMe ? [] : (await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,[tutorId],usersGroupsId)));
                   return res.status(HttpStatus.OK).json(await postOutput(output));
               }
               else{
                   const output =(postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(skip,take,queryParam,isAnonParam,userId,[tutorId]))
                       :(await privateMessageRepository.getPrivateMessageList(skip,take,queryParam,isAnonParam,[userId],[tutorId])));
                   return res.status(HttpStatus.OK).json(await pmOutput(output));
               }
           }
           if (req.user.payload.role === 'professor'){
               const professor = await professorRepository.getByUserId(userId);
               const tutorRepository = new TutorRepository();
               const tutors = await tutorRepository.getByProfessorId(professor[0].id);
               if (tutors.length){
                   let tutorGroupeId = tutors[0].groupeId;
                   if (tutorGroupeId == null) tutorGroupeId = -1;
                   const groupeMemberRepository = new GroupeMemberRepository();
                   const groupeMemberUserId =(await groupeMemberRepository.getByGroupeId(tutorGroupeId)).map(temp=>temp.userId);
                   if (post) {
                       const output =(postedByMe ? (await postRepository.getPostListByUserIdAndGroupe(skip,take,queryParam,isAnonParam,[userId],[tutorGroupeId]))
                           : (await postRepository.getPostListByGroupe(skip,take,queryParam,isAnonParam,tutorGroupeId)));
                       return res.status(HttpStatus.OK).json(await postOutput(output));
                   }
                   else{
                       const output =(postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(skip,take,queryParam,isAnonParam,userId,groupeMemberUserId))
                           : (await privateMessageRepository.getPrivateMessageList(skip,take,queryParam,isAnonParam,[userId],groupeMemberUserId)));
                       return res.status(HttpStatus.OK).json(await pmOutput(output));
                   }
               }
           }
       }
    }
    return res.status(HttpStatus.BAD_REQUEST).json({
        succes: false
    });
}




async function getPostByPostId(req: any, res: any) {
    const postId: number = req.body.postId;
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


export { createPost, getPostByPostId ,getPostList, getPrivateMessageByPrivateMessageId }
