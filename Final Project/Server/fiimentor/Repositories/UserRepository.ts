import { User } from "../models/entities/User";
import { Connection} from "typeorm";

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