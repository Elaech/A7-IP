import { Connection } from "typeorm";
import { User } from "../models/entities/User";
import { ReadWriteRepository } from "./ReadWriteRepository";
import {Tutor} from '../models/entities/Tutor'

export class TutorRepository extends ReadWriteRepository<Tutor>{

    constructor(conn: Connection) {
        super(User, conn);
    }

    async getByProfessorId (professorIdParameter: number) : Promise<Tutor[]> {
        return await this.connection.manager
            .find(Tutor, {where : {professorId : professorIdParameter} })
    }

    async getByGroupeId (groupeIdParameter: number) : Promise<Tutor[]> {
        return await this.connection.manager
            .find(Tutor, {where : {groupeId : groupeIdParameter} })
    }
}