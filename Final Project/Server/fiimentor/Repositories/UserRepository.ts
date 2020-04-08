import { User } from "../models/entities/User";
import { Connection, InsertResult, DeleteResult } from "typeorm";
import { IReadRepository } from "./IReadRepository";
import { IWriteRepository } from "./IWriteRepository";
import { ReadWriteRepository } from "./ReadWriteRepository";

export class UserRepository extends ReadWriteRepository<User>{

    constructor(conn: Connection) {
        super(User, conn);
    }

    async getByUsername(usernameParameter: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { username: usernameParameter } })
    }

}