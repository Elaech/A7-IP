
import {UserRepository} from "../../Repositories/UserRepository";
import {PrivateMessage} from "../../models/entities/PrivateMessage";
import {privateMessageResult} from "./privateMessageResult";

export class pmListOutput {

    static async pmOutput(pms: PrivateMessage[]): Promise<privateMessageResult[]> {
        let finalOutput: privateMessageResult[] = [];
        const userRepository = new UserRepository();
        for (let i = 0; i < pms.length; i++) {
            const user = (await userRepository.getById(pms[i].senderId))[0];
            const author = `${user.firstName} ${user.lastName}`
            finalOutput[i] = new privateMessageResult("",pms[i].id,author,pms[i].time!);
        }
        return finalOutput;
    }
}