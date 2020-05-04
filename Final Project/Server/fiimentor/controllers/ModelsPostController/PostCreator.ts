import { IPostOption } from "./IPostOption";

export class PostCreator {
    private postOption: IPostOption;

    constructor(postOption: IPostOption) {
        this.postOption = postOption
    }

    async createPost(): Promise<void> {
        await this.postOption.createPost();
    }

}