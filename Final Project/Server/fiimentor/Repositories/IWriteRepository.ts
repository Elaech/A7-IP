import { InsertResult, DeleteResult } from "typeorm";


export interface IWriteRepository<T> {
    create(typeEntity:T): Promise<InsertResult>;
    delete(id:number):Promise<DeleteResult>;
}
