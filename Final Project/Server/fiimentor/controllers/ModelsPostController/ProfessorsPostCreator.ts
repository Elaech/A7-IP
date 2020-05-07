import { IProfessorsPostOption } from "./IProfessorsPostOption";

export class ProfessorsPostCreator {
    private professorsPostOption: IProfessorsPostOption;

    constructor(professorsPostOption: IProfessorsPostOption) {
        this.professorsPostOption = professorsPostOption;
    }

    async createProfessorsPost(): Promise<void> {
        this.professorsPostOption.createProfessorsPost();
    }
}