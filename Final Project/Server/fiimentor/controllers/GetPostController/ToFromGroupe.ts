import {GetPostListOptions} from "./GetPostListOptions";
import {PostResult} from "./PostResult";
import {PrivateMessageResult} from "./PrivateMessageResult";
import {PostRepository} from "../../Repositories/PostRepository";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";
import {PostListOutput} from "./PostListOutput";
import {PrivateMessageListOutput} from "./PrivateMessageListOutput";
import {GroupeMemberRepository} from "../../Repositories/GroupeMemberRepository";

export class ToFromGroupe{
    static async postsToFromGroupe(options:GetPostListOptions, groupeId:number):Promise<(PostResult|PrivateMessageResult)[]>{
        const groupeMemberRepository = new GroupeMemberRepository();
        const groupeMemberUserId = (await groupeMemberRepository.getByGroupeId(groupeId)).map(temp => temp.userId);
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? (await postRepository.getPostListByUserIdAndGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], [groupeId]))
                : (await postRepository.getPostListByGroupe(options.skip, options.take, options.queryParam, options.isAnonParam, groupeId)))
            return await PostListOutput.postOutput(output);
        } else {
            const privateMessageRepository= new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderIdAndUserIdArray(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, groupeMemberUserId))
                : (await privateMessageRepository.getPrivateMessageList(options.skip, options.take, options.queryParam, options.isAnonParam, [options.userId], groupeMemberUserId)));
            return await PrivateMessageListOutput.privateMessageOutput(output);
        }
    }
}