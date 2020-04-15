import { ProfessorRepository } from "../Repositories/ProfessorRepository";
import { UserRepository } from "../Repositories/UserRepository";
import HttpStatus from "http-status-codes";

interface ProfessorPayload {
    id : number ,
    UserId : number ,
    FirstName : string,
    LastName : string 
}

async function getProfessorList (req : any , res: any) {

    try {

        const professorsArray : ProfessorPayload[] = [];

        const userRepository = new UserRepository();
        const users = await userRepository.getAll();

    
        const professorRepository = new ProfessorRepository();
        const allProfessors = await professorRepository.getAll();


        // le payload : ProfessorPayload;
        allProfessors.forEach(item => {
            
            const index = item.userId - 1;
            const payload = {
                id : item.id ,
                UserId : item.userId ,
                FirstName : users[index].firstName ,
                LastName : users[index].lastName ,
            }
            professorsArray.push(payload);
        });
        return res.status(HttpStatus.OK).json({
           professorsArray,
        });
    }catch(error) {
        req.log.error(`Unable to get professors -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    };
}

const utils = {getProfessorList};

export = utils;
