import { ReadWriteRepository } from "./ReadWriteRepository";
import { PrivateMessage } from "../models/entities/PrivateMessage";

export class PrivateMessageRepository extends ReadWriteRepository<PrivateMessage> {
    constructor() {
        super(PrivateMessage);
    }
}