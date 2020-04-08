export interface IReadRepository<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T[]>;
}

