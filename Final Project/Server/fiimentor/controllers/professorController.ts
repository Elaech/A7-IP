import { ProfessorRepository } from "../Repositories/ProfessorRepository";
import { UserRepository } from "../Repositories/UserRepository";
import HttpStatus from "http-status-codes";

interface ProfessorPayload {
    id : number ,
    UserId : number ,
    FirstName : string,
    LastName : string 
}

async function professor_list (req : any , res: any) {

    try {

        let proffesorsArray = new Array<ProfessorPayload>();

        const userRepository = new UserRepository();
        const users = await userRepository.getAll();

    
        const professorRepository = new ProfessorRepository();
        const allProfessors = await professorRepository.getAll();


        let payload : ProfessorPayload;
        let contor : number;
        allProfessors.forEach(item => {
            
            contor = item.userId - 1;
            payload = {
                id : item.id ,
                UserId : item.userId ,
                FirstName : users[contor].firstName ,
                LastName : users[contor].lastName ,
            }
            proffesorsArray.push(payload);
        });
        return res.status(HttpStatus.OK).json({
           proffesorsArray,
        });
    }catch(error) {
        req.log.error(`Unable to get professors -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    };
}

const utils = {professor_list};

export = utils;
