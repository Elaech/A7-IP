import { ReadWriteRepository } from "./ReadWriteRepository";
import { PostComment } from "../models/entities/PostComment";

export class PostCommentRepository extends ReadWriteRepository<PostComment> {
    constructor() {
        super(PostComment);
    }
}