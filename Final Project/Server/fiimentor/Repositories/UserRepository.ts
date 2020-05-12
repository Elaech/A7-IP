import { User } from "../models/entities/User";
import { ReadWriteRepository } from "./ReadWriteRepository";
import {UpdateResult} from "typeorm";

export class UserRepository extends ReadWriteRepository<User>{

    constructor() {
        super(User);
    }

    async getByUsername(usernameParameter: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { username: usernameParameter } })
    }

    async getBySerialNumber(serialNumber: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { serialNumber: serialNumber } })
    }

    async setRole( role: string, id: number): Promise<UpdateResult>{
        return await this.connection.manager.update(User,{ id: id}, {role: role});
    }


    async getByRole(role: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { role: role } });
    }
}