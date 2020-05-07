import {postResult} from "./postResult";
import {privateMessageResult} from "./privateMessageResult";
import {getPostListOptions} from "./getPostListOptions";
import HttpStatus from "http-status-codes";
import {PostRepository} from "../../Repositories/PostRepository";
import {postListOutput} from "./postListOutput";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {pmListOutput} from "./pmListOutput";
import {StudentRepository} from "../../Repositories/StudentRepository";

export class toFromProfessors{
    static async allProfessors(options:getPostListOptions,userRole:string,professorsGroupeId:number,professorsUserId:number[]):Promise<(postResult|privateMessageResult)[]>{
        if (options.post) {
            const postRepository = new PostRepository();
            const postsByProfs = (userRole === "student") ?
                (options.postedByMe ? [] : await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, professorsUserId, options.usersGroupsId))
                : (options.postedByMe ? (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], options.usersGroupsId))
                    : (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, professorsUserId, options.usersGroupsId)));
            const myPostsForProfs = (userRole === "student") ?
                (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [professorsGroupeId])) : [];
            const posts = postsByProfs.concat(myPostsForProfs);
            posts.sort((a, b) => a.time!.getTime() > b.time!.getTime() ? 1 : -1);
            const output = posts;
            return await postListOutput.postOutput(output);
        } else {
            const privateMessageRepository = new PrivateMessageRepository();
            const output = (options.postedByMe ? await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, professorsUserId)
                : await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], professorsUserId));
            return await pmListOutput.pmOutput(output);
        }
    }

    static async specificProfessor(options:getPostListOptions,professorId:number):Promise<(postResult|privateMessageResult)[]>{
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? [] : (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [professorId], options.usersGroupsId)));
            return await postListOutput.postOutput(output);
        } else {
            const privateMessageRepository = new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, [professorId]))
                : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [professorId])));
            return await pmListOutput.pmOutput(output);
        }
    }

    static async tutorWhenUserIsStudent(options:getPostListOptions,professorId:number):Promise<(postResult|privateMessageResult)[]>{
        const studentRepository = new StudentRepository();
        let tutorId = (await studentRepository.getByUserId(options.userId))[0].tutorId;
        if (tutorId == null) tutorId = 0;
        if (options.post) {
            const output = (options.postedByMe ? [] : (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [tutorId], options.usersGroupsId)));
            return res.status(HttpStatus.OK).json(await postOutput(output));
        } else {
            const output = (postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(skip, take, queryParam, isAnonParam, userId, [tutorId]))
                : (await privateMessageRepository.getPrivateMessageList(skip, take, queryParam, isAnonParam, [userId], [tutorId])));
            return res.status(HttpStatus.OK).json(await pmOutput(output));
        }
    }
}