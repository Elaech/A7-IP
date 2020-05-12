import { IPostOption } from "./IPostOption";
import { IGroupePostOption } from "./IGroupePostOption";
import { GroupePostCreator } from "./GroupePostCreator";

export class PostGroupe implements IPostOption {
    private groupePostOption: IGroupePostOption;

    constructor(groupePostOption: IGroupePostOption) {
        this.groupePostOption = groupePostOption;
    }
    async createPost(): Promise<void> {
        const groupePostCreator: GroupePostCreator = new GroupePostCreator(this.groupePostOption);
        groupePostCreator.createGroupePost();
    }

}