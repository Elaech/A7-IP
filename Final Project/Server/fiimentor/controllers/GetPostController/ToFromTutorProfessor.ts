import {GetPostListOptions} from "./GetPostListOptions";
import {PostResult} from "./PostResult";
import {PrivateMessageResult} from "./PrivateMessageResult";
import {StudentRepository} from "../../Repositories/StudentRepository";
import {PostRepository} from "../../Repositories/PostRepository";
import {PostListOutput} from "./PostListOutput";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {PrivateMessageListOutput} from "./PrivateMessageListOutput";
import {TutorRepository} from "../../Repositories/TutorRepository";
import {GroupeMemberRepository} from "../../Repositories/GroupeMemberRepository";
import {ProfessorRepository} from "../../Repositories/ProfessorRepository";

export class ToFromTutorProfessor{

    static async tutorWhenUserIsStudent(options:GetPostListOptions):Promise<{ totalPosts: number; posts: (PostResult | PrivateMessageResult)[] }>{
        const studentRepository = new StudentRepository();
        let tutorId = (await studentRepository.getByUserId(options.userId))[0].tutorId;
        if (tutorId == null) tutorId = 0;
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? [] : (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [tutorId], options.usersGroupsId)));
            const counter : number = (options.postedByMe ? 0 : (await postRepository.countPostListByUserIdAndGroupe(options.queryParam, options.isAnonParam, [tutorId], options.usersGroupsId))[1]);
            return {
                totalPosts:counter,
                posts: await PostListOutput.postOutput(output)
            };
        } else {
            const privateMessageRepository = new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, [tutorId]))
                : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [tutorId])));
            const counter : number = (options.postedByMe ? (await privateMessageRepository.countPrivateMessageListBySenderIdAndUserIdArray(options.queryParam, options.isAnonParam, options.userId, [tutorId]))[1]
                : (await privateMessageRepository.countPrivateMessageList(options.queryParam, options.isAnonParam, [options.userId], [tutorId]))[1]);
            return {
                totalPosts:counter,
                posts: await PrivateMessageListOutput.privateMessageOutput(output)
            };
        }
    }

    static async tutorWhenUserIsProfessor(options:GetPostListOptions):Promise<{ totalPosts: number; posts: (PostResult | PrivateMessageResult)[] }>{
        const professorRepository= new ProfessorRepository();
        const professor = await professorRepository.getByUserId(options.userId);
        const tutorRepository = new TutorRepository();
        const tutors = await tutorRepository.getByProfessorId(professor[0].id);

        if (tutors.length) {
            let tutorGroupeId = tutors[0].groupeId;
            if (tutorGroupeId == null) tutorGroupeId = -1;
            const groupeMemberRepository = new GroupeMemberRepository();
            const groupeMemberUserId = (await groupeMemberRepository.getByGroupeId(tutorGroupeId)).map(temp => temp.userId);

            if (options.post) {
                const postRepository = new PostRepository();
                const output = (options.postedByMe ? (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [tutorGroupeId]))
                    : (await postRepository.getPostListByGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, tutorGroupeId)));
                const counter : number = (options.postedByMe ? (await postRepository.countPostListByUserIdAndGroupe(options.queryParam, options.isAnonParam, [options.userId], [tutorGroupeId]))[1]
                    : (await postRepository.countPostListByGroupe(options.queryParam, options.isAnonParam, tutorGroupeId))[1]);
                return {
                    totalPosts:counter,
                    posts: await PostListOutput.postOutput(output)
                };
            } else {
                const privateMessageRepository = new PrivateMessageRepository();
                const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, groupeMemberUserId))
                    : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], groupeMemberUserId)));
                const counter : number = (options.postedByMe ? (await privateMessageRepository.countPrivateMessageListBySenderIdAndUserIdArray(options.queryParam, options.isAnonParam, options.userId, groupeMemberUserId))[1]
                    : (await privateMessageRepository.countPrivateMessageList( options.queryParam, options.isAnonParam, [options.userId], groupeMemberUserId))[1]);
                return {
                    totalPosts:counter,
                    posts: await PrivateMessageListOutput.privateMessageOutput(output)
                };
            }
        }
        return {
            totalPosts: 0,
            posts: []
        };
    }
}