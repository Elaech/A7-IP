import {getPostListOptions} from "./getPostListOptions";
import {postResult} from "./postResult";
import {privateMessageResult} from "./privateMessageResult";
import {StudentRepository} from "../../Repositories/StudentRepository";
import {PostRepository} from "../../Repositories/PostRepository";
import {postListOutput} from "./postListOutput";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {pmListOutput} from "./pmListOutput";
import {TutorRepository} from "../../Repositories/TutorRepository";
import {GroupeMemberRepository} from "../../Repositories/GroupeMemberRepository";
import {ProfessorRepository} from "../../Repositories/ProfessorRepository";

export class toFromTutorProfessor{

    static async tutorWhenUserIsStudent(options:getPostListOptions):Promise<(postResult|privateMessageResult)[]>{
        const studentRepository = new StudentRepository();
        let tutorId = (await studentRepository.getByUserId(options.userId))[0].tutorId;
        if (tutorId == null) tutorId = 0;
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? [] : (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [tutorId], options.usersGroupsId)));
            return await postListOutput.postOutput(output);
        } else {
            const privateMessageRepository = new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, [tutorId]))
                : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [tutorId])));
            return await pmListOutput.pmOutput(output);
        }
    }

    static async tutorWhenUserIsProfessor(options:getPostListOptions):Promise<(postResult|privateMessageResult)[]>{
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
                return await postListOutput.postOutput(output);
            } else {
                const privateMessageRepository = new PrivateMessageRepository();
                const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, groupeMemberUserId))
                    : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], groupeMemberUserId)));
                return await pmListOutput.pmOutput(output);
            }
        }
        return [];
    }
}