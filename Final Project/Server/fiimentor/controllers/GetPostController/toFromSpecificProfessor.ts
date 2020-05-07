import {getPostListOptions} from "./getPostListOptions";
import {postResult} from "./postResult";
import {privateMessageResult} from "./privateMessageResult";
import {PostRepository} from "../../Repositories/PostRepository";
import {postListOutput} from "./postListOutput";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {pmListOutput} from "./pmListOutput";

export class toFromSpecificProfessor{
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
}