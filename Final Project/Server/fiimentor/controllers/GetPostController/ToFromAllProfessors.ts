import {PostResult} from "./PostResult";
import {PrivateMessageResult} from "./PrivateMessageResult";
import {GetPostListOptions} from "./GetPostListOptions";
import {PostRepository} from "../../Repositories/PostRepository";
import {PostListOutput} from "./PostListOutput";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {PrivateMessageListOutput} from "./PrivateMessageListOutput";
import {GroupeRepository} from "../../Repositories/GroupeRepository";
import {ProfessorRepository} from "../../Repositories/ProfessorRepository";

export class ToFromAllProfessors{
    static async allProfessors(options:GetPostListOptions, userRole:string):Promise<(PostResult|PrivateMessageResult)[]>{
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
            return await PostListOutput.postOutput(output);
        } else {
            const privateMessageRepository = new PrivateMessageRepository();
            const output = (options.postedByMe ? await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, professorsUserId)
                : await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], professorsUserId));
            return await PrivateMessageListOutput.privateMessageOutput(output);
        }
    }
}