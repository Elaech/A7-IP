import {GetPostListOptions} from "./GetPostListOptions";
import {PostRepository} from "../../Repositories/PostRepository";
import {PostListOutput} from "./PostListOutput";
import {PrivateMessageListOutput} from "./PrivateMessageListOutput";
import { PrivateMessageResult } from "./PrivateMessageResult";
import {PostResult} from "./PostResult";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";

export class ToFromAll{
    static async postsToFromAll(options:GetPostListOptions):Promise<{ totalPosts: number; posts: (PostResult | PrivateMessageResult)[] }>{
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? (await postRepository.getPostListByUserId(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId))
                : (await postRepository.getAllPostList(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, options.usersGroupsId)));
            const counter  :number = (options.postedByMe ? (await postRepository.countPostListByUserId(options.queryParam, options.isAnonParam, options.userId))[1]
                : (await postRepository.countAllPostList(options.queryParam, options.isAnonParam, options.userId, options.usersGroupsId))[1]);
            return {
                totalPosts:counter,
                posts: await PostListOutput.postOutput(output)
            };
        } else {
            const privateMessageRepository= new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderId(options.skip,options.take, options.queryParam, options.isAnonParam, options.userId))
                : (await privateMessageRepository.getPrivateMessageListByUserId(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId)));
            const counter  :number = (options.postedByMe ? (await privateMessageRepository.countPrivateMessageListBySenderId( options.queryParam, options.isAnonParam, options.userId))[1]
                : (await privateMessageRepository.countPrivateMessageListByUserId(options.queryParam, options.isAnonParam, options.userId))[1]);
            return {
                totalPosts:counter,
                posts: await PrivateMessageListOutput.privateMessageOutput(output)
            };
        }
    }
}
