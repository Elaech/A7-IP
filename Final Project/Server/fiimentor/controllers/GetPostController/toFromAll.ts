import {getPostListOptions} from "./getPostListOptions";
import {PostRepository} from "../../Repositories/PostRepository";
import {postListOutput} from "./postListOutput";
import {pmListOutput} from "./pmListOutput";
import { privateMessageResult } from "./privateMessageResult";
import {postResult} from "./postResult";
import {PrivateMessageRepository} from "../../Repositories/PrivateMessageRepository";

export class toFromAll{
    static async postsToFromAll(options:getPostListOptions):Promise<(postResult|privateMessageResult)[]>{
        if (options.post) {
            const postRepository = new PostRepository();
            const output = (options.postedByMe ? (await postRepository.getPostListByUserId(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId))
                : (await postRepository.getAllPostList(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId, options.usersGroupsId)));
            return await postListOutput.postOutput(output);
        } else {
            const privateMessageRepository= new PrivateMessageRepository();
            const output = (options.postedByMe ? (await privateMessageRepository.getPrivateMessageListBySenderId(options.skip,options.take, options.queryParam, options.isAnonParam, options.userId))
                : (await privateMessageRepository.getPrivateMessageListByUserId(options.skip, options.take, options.queryParam, options.isAnonParam, options.userId)));
            return await pmListOutput.pmOutput(output);
        }
    }
}
