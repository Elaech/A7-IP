import { UserRepository } from "../../Repositories/UserRepository";
import { Student } from "../../models/entities/Student";
import { ReadWriteRepository } from "../../Repositories/ReadWriteRepository";
import { Professor } from "../../models/entities/Professor";
import HttpStatus from "http-status-codes";

async function registerRole(req: any, res: any) {
    try {
        const id = req.body.id;
        const role = req.body.role;
        const userRepository = new UserRepository();

        await userRepository.setRole(role, id);


        if (role.localeCompare("student") == 0) { // student
            let student = new Student();
            student.userId = id;
            const repository = new ReadWriteRepository(Student);
            await repository.create(student);
        } else if (role.localeCompare("professor") == 0) {
            let professor = new Professor();
            professor.userId = id;
            const repository = new ReadWriteRepository(Professor);
            await repository.create(professor);
        } 

        return res.status(HttpStatus.OK).json({
            success: true,
        });

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}

const utils = {registerRole};

export = utils;