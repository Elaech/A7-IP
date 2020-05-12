import HttpStatus from "http-status-codes";
import { UserRepository } from "../../Repositories/UserRepository";
import { StudentRepository } from "../../Repositories/StudentRepository";
import { Student } from "../../models/entities/Student";
import { createToken } from "../../utils";
import { ProfessorRepository } from "../../Repositories/ProfessorRepository";
import { Professor } from "../../models/entities/Professor";
import { TutorRepository } from "../../Repositories/TutorRepository";
import { Tutor } from "../../models/entities/Tutor";

interface LoginPayload {
    id: number;
    serialNumber: string;
    username: string;
    firstName: string;
    lastName: string
    role: string
    email: string;
};

interface LoginStudentPayload extends LoginPayload {
    group: string;
    year: number;
    tutorId?: number;
}

interface LoginProfessorPayload extends LoginPayload {
    academicRank: string;
}

interface LoginTutorPayload extends LoginProfessorPayload {
    groupId?: number;
}

async function login(req: any, res: any) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (req.body.username===undefined || req.body.password===undefined ||
            req.body.username===null || req.body.password===null){
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false
            });
        }
        const userRepository = new UserRepository();
        const userByUserName = await userRepository.getByUsername(username);

        if (!userByUserName.length) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                status: 'Invalid username'
            });
        } else {
            if (password.localeCompare(userByUserName[0].password) !== 0) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'Invalid password'
                });
            } else {
                if (userByUserName[0].role === "admin"){
                    return res.status(HttpStatus.UNAUTHORIZED).json({
                        success: false,
                        status: 'Unauthorized'
                    });
                }
                let token: any;

                if (userByUserName[0].role === "student") {
                    const studentRepository = new StudentRepository();
                    const student: Student[] = await studentRepository.getByUserId(userByUserName[0].id);
                    if (student.length) {
                        const payload: LoginStudentPayload = {
                            username: userByUserName[0].username,
                            id: userByUserName[0].id,
                            firstName: userByUserName[0].firstName,
                            lastName: userByUserName[0].lastName,
                            email: userByUserName[0].lastName,
                            serialNumber: userByUserName[0].serialNumber,
                            role: userByUserName[0].role,
                            group: student[0].groupe,
                            year: student[0].year,
                            tutorId: student[0].tutorId ? student[0].tutorId : undefined,

                        };
                        token = await createToken(payload, process.env.JWT_SECRET);
                        return res.status(HttpStatus.OK).json({
                            token: token,
                            payload,
                        });
                    }
                } else if (userByUserName[0].role === "professor") {

                    const professorRepository = new ProfessorRepository();
                    const professor: Professor[] = await professorRepository.getByUserId(userByUserName[0].id);
                    if (professor.length) {
                        const tutorRepository = new TutorRepository();
                        const tutor: Tutor[] = await tutorRepository.getByProfessorId(professor[0].id);

                        if (tutor.length) {
                            const payload: LoginTutorPayload = {
                                username: userByUserName[0].username,
                                id: userByUserName[0].id,
                                firstName: userByUserName[0].firstName,
                                lastName: userByUserName[0].lastName,
                                email: userByUserName[0].lastName,
                                serialNumber: userByUserName[0].serialNumber,
                                role: userByUserName[0].role,
                                academicRank: professor[0].academicRank,
                                groupId: tutor[0].groupeId ? tutor[0].groupeId : undefined,
                            }
                            token = await createToken(payload, process.env.JWT_SECRET);
                            return res.status(HttpStatus.OK).json({
                                token: token,
                                payload
                            });
                        } else {
                            const payload: LoginProfessorPayload = {
                                username: userByUserName[0].username,
                                id: userByUserName[0].id,
                                firstName: userByUserName[0].firstName,
                                lastName: userByUserName[0].lastName,
                                email: userByUserName[0].lastName,
                                serialNumber: userByUserName[0].serialNumber,
                                role: userByUserName[0].role,
                                academicRank: professor[0].academicRank,
                            }
                            token = await createToken(payload, process.env.JWT_SECRET);
                            return res.status(HttpStatus.OK).json({
                                token: token,
                                payload
                            });
                        }
                    }
                } else {
                    const payload: LoginPayload = {
                        username: userByUserName[0].username,
                        id: userByUserName[0].id,
                        firstName: userByUserName[0].firstName,
                        lastName: userByUserName[0].lastName,
                        email: userByUserName[0].lastName,
                        serialNumber: userByUserName[0].serialNumber,
                        role: userByUserName[0].role,
                    }
                    token = await createToken(payload, process.env.JWT_SECRET);
                    return res.status(HttpStatus.OK).json({
                        token: token,
                        payload
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}

const utils = {login};

export = utils;