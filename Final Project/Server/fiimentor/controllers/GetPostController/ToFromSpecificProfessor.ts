import {GetPostListOptions} from "./GetPostListOptions";
import {PostResult} from "./PostResult";
import {PrivateMessageResult} from "./PrivateMessageResult";
import {PostRepository} from "../../Repositories/PostRepository";
import {PostListOutput} from "./PostListOutput";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {PrivateMessageListOutput} from "./PrivateMessageListOutput";

export class ToFromSpecificProfessor{
    static async specificProfessor(options:GetPostListOptions, professorId:number):Promise<(PostResult|PrivateMessageResult)[]>{
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? [] : (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [professorId], options.usersGroupsId)));
            return await PostListOutput.postOutput(output);
        } else {
            const privateMessageRepository = new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, [professorId]))
                : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [professorId])));
            return await PrivateMessageListOutput.privateMessageOutput(output);
        }
    }
}