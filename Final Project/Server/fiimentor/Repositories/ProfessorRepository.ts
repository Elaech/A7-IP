import { Professor} from "../models/entities/Professor";

import { ReadWriteRepository } from "./ReadWriteRepository";

export class ProfessorRepository extends ReadWriteRepository<Professor>{

    constructor() {
        super(Professor);
    }

    async getByUserId(userIdParameter: number): Promise<Professor[]> {
        return await this.connection.manager
            .find(Professor, { where: { userId: userIdParameter } })
    }

}