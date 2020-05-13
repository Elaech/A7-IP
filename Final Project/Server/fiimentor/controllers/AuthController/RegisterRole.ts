import { UserRepository } from "../../Repositories/UserRepository";
import {StudentRepository} from "../../Repositories/StudentRepository"
import { Student } from "../../models/entities/Student";
import { ReadWriteRepository } from "../../Repositories/ReadWriteRepository";
import { Professor } from "../../models/entities/Professor";
import HttpStatus from "http-status-codes";
import { createToken } from "../../utils";
import { ProfessorRepository } from "../../Repositories/ProfessorRepository";
import { Tutor } from "../../models/entities/Tutor";
import { Groupe } from "../../models/entities/Groupe";
import { GroupeRepository } from "../../Repositories/GroupeRepository";

async function registerRole(req: any, res: any) {

    try {
        const id = req.user.payload.id;
        const role = req.body.role;

        const userRepository = new UserRepository();
        const userById = await userRepository.getById(id);
        await userRepository.setRole(role, id);
        
        switch(role) {
            case "student" : {
                const studentRepository = new StudentRepository();
                const studentById : Student[] = await studentRepository.getByUserId(id);

                const year = req.body.year;
                const letter = req.body.letter;
                const number = req.body.number;

                let student = new Student();
                student.userId = id;
                student.groupe = letter+number;
                student.year = year;
                const repository = new ReadWriteRepository(Student);
                await repository.create(student);

                const user = {
                    username : userById[0].username,
                    id : id ,
                    firstName : userById[0].firstName,
                    lastName : userById[0].lastName,
                    email : userById[0].email,
                    serialNumber : userById[0].serialNumber,
                    role : userById[0].role,
                    group : studentById[0].groupe,
                    year : year,
                    tutorId: studentById[0].tutorId ? studentById[0].tutorId : undefined,
                };
                const token = await createToken(user, process.env.JWT_SECRET);
                return res.status(HttpStatus.OK).json({
                    userToken: token,
                    user,
                });
            }
            case "professor" : {
                const academicRank = req.body.academicRank;

                let professor = new Professor();
                professor.userId = id;
                professor.academicRank = academicRank;
                const repository = new ReadWriteRepository(Professor);
                await repository.create(professor);

                const user = {
                    username : userById[0].username,
                    id : id ,
                    firstName : userById[0].firstName,
                    lastName : userById[0].lastName,
                    email : userById[0].email,
                    serialNumber : userById[0].serialNumber,
                    role : userById[0].role,
                    academicRank : academicRank,
                };
                const token = await createToken(user, process.env.JWT_SECRET);
                return res.status(HttpStatus.OK).json({
                    userToken: token,
                    user,
                });
            }
            case "tutore" : {
                const academicRank = req.body.academicRank;
                const groupeTitle = req.body.groupeTitle;

                const groupeRepository = new ReadWriteRepository(Groupe);
                const groupes = await groupeRepository.getAll();

            
                let professor = new Professor();
                professor.userId = id;
                professor.academicRank = academicRank;
                const repository = new ReadWriteRepository(Professor);
                await repository.create(professor);

                let tutor = new Tutor();
                tutor.professorId = professor.id;
                const last_el = groupes[groupes.length - 1];
                tutor.groupeId = last_el.id+1;
                const tutorRepository = new ReadWriteRepository(Tutor);
                await tutorRepository.create(tutor);


                let groupe = new Groupe();
                groupe.title = groupeTitle;
                groupe.ownerId = tutor.id;
                await groupeRepository.create(groupe);


                const user = {
                    username : userById[0].username,
                    id : id ,
                    firstName : userById[0].firstName,
                    lastName : userById[0].lastName,
                    email : userById[0].email,
                    serialNumber : userById[0].serialNumber,
                    role : role,
                    academicRank : academicRank
                };

                const token = await createToken(user, process.env.JWT_SECRET);
                return res.status(HttpStatus.OK).json({
                    userToken: token,
                    user,
                });
            }
            default : {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'Invalid Role'
                });
            }
        }


    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }

}
const utils = {registerRole};

export = utils;