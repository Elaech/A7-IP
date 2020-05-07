import {Post} from "../../models/entities/Post";
import {UserRepository} from "../../Repositories/UserRepository";
import {postResult} from "./postResult";

export class postListOutput {
    static async postOutput(posts: Post[]): Promise<postResult[]> {
        let finalOutput: postResult[] = [];
        const userRepository = new UserRepository();
        for (let i = 0; i < posts.length; i++) {
            const user = (await userRepository.getById(posts[i].userId))[0];
            const author = `${user.firstName} ${user.lastName}`;
            finalOutput[i] = new postResult(posts[i].title,posts[i].id,author,posts[i].groupeId,posts[i].time!);
        }
        return finalOutput;
    }
}