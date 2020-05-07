import {GetPostListOptions} from "./GetPostListOptions";
import {PostRepository} from "../../Repositories/PostRepository";
import {PostListOutput} from "./PostListOutput";
import {PrivateMessageListOutput} from "./PrivateMessageListOutput";
import { PrivateMessageResult } from "./PrivateMessageResult";
import {PostResult} from "./PostResult";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";

export class ToFromAll{
    static async postsToFromAll(options:GetPostListOptions):Promise<(PostResult|PrivateMessageResult)[]>{
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? (await postRepository.getPostListByUserId(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId))
                : (await postRepository.getAllPostList(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, options.usersGroupsId)));
            return await PostListOutput.postOutput(output);
        } else {
            const privateMessageRepository= new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderId(options.skip,options.take, options.queryParam, options.isAnonParam, options.userId))
                : (await privateMessageRepository.getPrivateMessageListByUserId(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId)));
            return await PrivateMessageListOutput.privateMessageOutput(output);
        }
    }
}
