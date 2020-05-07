import {getPostListOptions} from "./getPostListOptions";
import {postResult} from "./postResult";
import {privateMessageResult} from "./privateMessageResult";
import {PostRepository} from "../../Repositories/PostRepository";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {postListOutput} from "./postListOutput";
import {pmListOutput} from "./pmListOutput";
import {GroupeMemberRepository} from "../../Repositories/GroupeMemberRepository";

export class toFromGroupe{
    static async postsToFromGroupe(options:getPostListOptions,groupeId:number):Promise<(postResult|privateMessageResult)[]>{
        const groupeMemberRepository = new GroupeMemberRepository();
        const groupeMemberUserId = (await groupeMemberRepository.getByGroupeId(groupeId)).map(temp => temp.userId);
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [groupeId]))
                : (await postRepository.getPostListByGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, groupeId)))
            return await postListOutput.postOutput(output);
        } else {
            const privateMessageRepository= new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, groupeMemberUserId))
                : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], groupeMemberUserId)));
            return await pmListOutput.pmOutput(output);
        }
    }
}