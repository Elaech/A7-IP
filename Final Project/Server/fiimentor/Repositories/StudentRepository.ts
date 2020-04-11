import { ReadWriteRepository } from "./ReadWriteRepository";
import { Student } from '../models/entities/Student'
export class StudentRepository extends ReadWriteRepository<Student>{

    constructor() {
        super(Student);
    }

    async getByUserId(userIdParameter: number): Promise<Student[]> {
        return await this.connection.manager
            .find(Student, { where: { userId: userIdParameter } })
    }

}