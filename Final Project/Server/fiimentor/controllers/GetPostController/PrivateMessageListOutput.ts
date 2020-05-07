
import {UserRepository} from "../../Repositories/UserRepository";
import {PrivateMessage} from "../../models/entities/PrivateMessage";
import {PrivateMessageResult} from "./PrivateMessageResult";

export class PrivateMessageListOutput {

    static async privateMessageOutput(pms: PrivateMessage[]): Promise<PrivateMessageResult[]> {
        let finalOutput: PrivateMessageResult[] = [];
        const userRepository = new UserRepository();
        for (let i = 0; i < pms.length; i++) {
            const user = (await userRepository.getById(pms[i].senderId))[0];
            const author = `${user.firstName} ${user.lastName}`
            finalOutput[i] = new PrivateMessageResult("",pms[i].id,author,pms[i].time!);
        }
        return finalOutput;
    }
}