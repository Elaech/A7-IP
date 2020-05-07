import { IGroupePostOption } from "./IGroupePostOption";

export class GroupePostCreator {
    private groupePostOption: IGroupePostOption;

    constructor(groupePostOption: IGroupePostOption) {
        this.groupePostOption = groupePostOption;
    }

    async createGroupePost(): Promise<void> {
        await this.groupePostOption.createGroupePost();
    }
}