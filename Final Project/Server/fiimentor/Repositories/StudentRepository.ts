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

    async getByGroupe (groupeParameter: string) : Promise<Student[]> {
        return await this.connection.manager
            .find(Student, {where : {groupe : groupeParameter} })
    }

    async getByYear (yearParameter: number) : Promise<Student[]> {
        return await this.connection.manager
            .find(Student, {where : {year : yearParameter} })
    }

    async getByTutorId (tutorIdParameter: number) : Promise<Student[]> {
        return await this.connection.manager
            .find(Student, {where : {tutorId : tutorIdParameter} })
    }
}