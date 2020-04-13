import { ReadWriteRepository } from "./ReadWriteRepository";
import { Groupe } from "../models/entities/Groupe";

export class GroupeRepository extends ReadWriteRepository<Groupe> {

    constructor() {
        super(Groupe)
    }

    async  getByTitle(titleParameter: String): Promise<Groupe[]> {
        return await this.connection.manager.
            find(Groupe, { where: { title: titleParameter } });
    }
}