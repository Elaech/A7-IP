import {postResult} from "./postResult";
import {privateMessageResult} from "./privateMessageResult";
import {getPostListOptions} from "./getPostListOptions";
import {PostRepository} from "../../Repositories/PostRepository";
import {postListOutput} from "./postListOutput";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {pmListOutput} from "./pmListOutput";
import {GroupeRepository} from "../../Repositories/GroupeRepository";
import {ProfessorRepository} from "../../Repositories/ProfessorRepository";

export class toFromAllProfessors{
    static async allProfessors(options:getPostListOptions,userRole:string):Promise<(postResult|privateMessageResult)[]>{
        const professorRepository = new ProfessorRepository();
        const professors = await professorRepository.getAll();
        const groupeRepository = new GroupeRepository();
        const professorsUserId = professors.map(temp => temp.userId);
        const professorsGroupeId = (await groupeRepository.getByTitle("allProfessors"))[0].id;

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
}