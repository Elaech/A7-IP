import { ReadRepository } from "./ReadRepository";
import { User } from "../models/entities/User";
import { Connection } from "typeorm";

export class UserReadRepository extends ReadRepository<User> {

    private conn: Connection;

    constructor(connection: Connection) {
        super(User, connection);
        this.conn = connection;
    }

    async getByUsername(usernameParameter: string): Promise<any> {
        return await this.conn.getRepository(User)
            .createQueryBuilder("user")
            .select()
            .where("user.username=:username", { username: usernameParameter })
            .getOne();
    }

}