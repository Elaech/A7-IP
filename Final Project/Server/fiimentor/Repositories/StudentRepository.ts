import { User } from "../models/entities/User";
import { Connection } from "typeorm";
import { ReadWriteRepository } from "./ReadWriteRepository";
import {Student} from '../models/entities/Student'
export class StudentRepository extends ReadWriteRepository<Student>{

    constructor(conn: Connection) {
        super(User, conn);
    }

    async getByUserId (userIdParameter: number) : Promise<Student[]> {
        return await this.connection.manager
            .find(Student, {where : {userId : userIdParameter} })
    }

}