import { IReadRepository } from "./IReadRepository";
import { IWriteRepository } from "./IWriteRepository";
import { EntityManager, ObjectType, InsertResult, DeleteResult, Connection } from "typeorm";

export class ReadWriteRepository<T> implements IReadRepository<T>, IWriteRepository<T> {

    private typeEntity: ObjectType<T>;
    protected connection: Connection;

    constructor(type: ObjectType<T>, conn: Connection) {
        this.typeEntity = type;
        this.connection = conn;
    }

    async getAll(): Promise<T[]> {
        return await this.connection.manager.find(this.typeEntity);
    }

    async getById(id: number): Promise<T[]> {
        return await this.connection.manager.
            find(this.typeEntity, { where: { id: id } });
    }

    async create(type: T): Promise<InsertResult> {
        return await this.connection.manager
            .createQueryBuilder()
            .insert()
            .into(this.typeEntity)
            .values(type)
            .execute();
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.connection.manager
            .createQueryBuilder()
            .delete()
            .from(this.typeEntity)
            .where("id=:id", { id: id })
            .execute();
    }

}