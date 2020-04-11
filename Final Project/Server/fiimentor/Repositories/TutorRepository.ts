import { ReadWriteRepository } from "./ReadWriteRepository";
import { Tutor } from '../models/entities/Tutor'

export class TutorRepository extends ReadWriteRepository<Tutor>{

    constructor() {
        super(Tutor);
    }

    async getByProfessorId(professorIdParameter: number): Promise<Tutor[]> {
        return await this.connection.manager
            .find(Tutor, { where: { professorId: professorIdParameter } })
    }


}