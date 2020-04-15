import { ReadWriteRepository } from "./ReadWriteRepository";
import { Post } from "../models/entities/Post";

export class PostRepository extends ReadWriteRepository<Post> {

    constructor() {
        super(Post);
    }
}