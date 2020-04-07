import { Connection, ObjectType } from "typeorm";

export class ReadRepository<T> {

    private connection: Connection;
    private type: ObjectType<T>;

    constructor(type: ObjectType<T>, conn: Connection) {
        this.type = type;
        this.connection = conn;
    }
    async getAll(): Promise<any> {
        return await this.connection.manager.
            find(this.type);
    }

    async getById(typeId: number): Promise<any> {
        return await this.connection.manager
            .getRepository(this.type)
            .findOne(typeId);
    }
}
