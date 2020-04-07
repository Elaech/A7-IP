import { User } from "../models/entities/User";
import { Connection, InsertResult, DeleteResult } from "typeorm";
import { IReadRepository } from "./IReadRepository";
import { IWriteRepository } from "./IWriteRepository";

export class UserRepository implements IReadRepository<User>, IWriteRepository<User>{

    private connection: Connection;

    constructor(conn: Connection) {
        this.connection = conn;
    }


    async getAll(): Promise<User[]> {
        return await this.connection.manager.find(User);
    }

    async getById(id: number): Promise<User[]> {
        return await this.connection.manager.
            find(User, { where: { id: id } });
    }

    async create(typeEntity: User): Promise<InsertResult> {
        return await this.connection.manager
            .createQueryBuilder()
            .insert()
            .into(User)
            .values(typeEntity)
            .execute();
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.connection.manager
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id=:id", { id: id })
            .execute();
    }

    async getByUsername(usernameParameter: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { username: usernameParameter } })
    }

}