import { ObjectType, Connection, DeepPartial } from "typeorm";

export class WriteRepository<T> {
    private type: ObjectType<T>;
    private connection: Connection;

    constructor(type: ObjectType<T>, conn: Connection) {
        this.type = type;
        this.connection = conn;
    }

    async create(typeEntity: DeepPartial<T>): Promise<any> {
        await this.connection.manager
            .createQueryBuilder()
            .insert()
            .into(this.type)
            .values(typeEntity)
            .execute();
    }
    async delete(userId: number): Promise<any> {
        await this.connection.manager
            .createQueryBuilder()
            .delete()
            .from(this.type)
            .where("id=:id", { id: userId })
            .execute();
    }
}