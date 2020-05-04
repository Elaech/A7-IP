import { IPostOption } from "./IPostOption";
import { IProfessorsPostOption } from "./IProfessorsPostOption";
import { ProfessorsPostCreator } from "./ProfessorsPostCreator";

export class PostProfessors implements IPostOption {

    private professorsPostOption: IProfessorsPostOption;

    constructor(professorsPostOption: IProfessorsPostOption) {
        this.professorsPostOption = professorsPostOption;
    }

    async createPost(): Promise<void> {
        const professorsPostCreator: ProfessorsPostCreator = new ProfessorsPostCreator(this.professorsPostOption);
        await professorsPostCreator.createProfessorsPost();
    }
}
