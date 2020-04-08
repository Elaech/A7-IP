import { User } from "../models/entities/User";
import { Professor} from "../models/entities/Professor";
import { Connection} from "typeorm";

import { ReadWriteRepository } from "./ReadWriteRepository";

export class ProfessorRepository extends ReadWriteRepository<Professor>{

    constructor(conn: Connection) {
        super(User, conn);
    }

    async getByUserId(userIdParameter: number): Promise<Professor[]> {
        return await this.connection.manager
            .find(Professor, { where: { userId: userIdParameter } })
    }


    async getByAcademicRank(academicRank: string): Promise<Professor[]> {
        return await this.connection.manager
            .find(Professor, { where: { academicRank: academicRank } })
    }
}