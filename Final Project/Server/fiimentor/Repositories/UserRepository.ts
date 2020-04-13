import { User } from "../models/entities/User";
import { ReadWriteRepository } from "./ReadWriteRepository";

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


    async getByRole(role: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { role: role } });
    }
}