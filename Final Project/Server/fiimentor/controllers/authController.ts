import HttpStatus from "http-status-codes";
import {createToken} from '../utils';
import {UserRepository} from '../Repositories/UserRepository'
import {ProfessorRepository} from "../Repositories/ProfessorRepository";
import {StudentRepository} from "../Repositories/StudentRepository";
import {TutorRepository} from "../Repositories/TutorRepository";
import {Student} from '../models/entities/Student';
import {Professor} from "../models/entities/Professor";
import {Tutor} from '../models/entities/Tutor';
import {User} from "../models/entities/User";
import {error} from "console";
import {ReadWriteRepository} from "../Repositories/ReadWriteRepository";

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

async function register(req: any, res: any) {
    try {
        const serialNumber = req.body.serialNumber;
        const username = req.body.username;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const newUser = new User();


        const regexpEmail =
            new RegExp(/[a-zA-Z0-9_\\.\\+-]+@info.uaic.ro$/);

        const regexSerialNumber =
            new RegExp(/^([0-9]{9})(RSL|ESL)([0-9]{6})?$/);

        if (username.toString().length < 5 || username.toString().length > 50) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Username is not the right length. It must contain 5-50 characters",
            });
        }
        newUser.username = username;

        if (password.toString().length < 5 || password.toString().length > 50) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Password is not the right length. It must contain 5-50 characters.",
            });
        }

        if (password.localeCompare(password.toUpperCase()) == 0) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Password does not contain lower case letters",
            });
        }

        if (password.localeCompare(password.toLowerCase()) == 0) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Password does not contain upper case letters",
            });
        }
        newUser.password = password;

        if (firstName.toString().length < 3 || firstName.toString().length > 50) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "First Name not the right length. It must contain 3-50 characters",
            });
        }
        newUser.firstName = firstName;

        if (lastName.toString().length < 3 || lastName.toString().length > 50) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Last Name not the right length. It must contain 3-50 characters",
            });
        }
        newUser.lastName = lastName;

        if (!regexpEmail.test(email)) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Email not valid"
            });
        }
        newUser.email = email;

        if (!regexSerialNumber.test(serialNumber)) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Serial Number not valid"
            });
        }
        newUser.serialNumber = serialNumber;

        const userRepository = new UserRepository();
        const userByUserName = await userRepository.getByUsername(newUser.username);

        if (userByUserName.length != 0) {
            return res.status(HttpStatus.CONFLICT).json({
                success: false,
                error: "Username is taken"
            });
        }

        const userBySerialNumber = await userRepository.getBySerialNumber(newUser.serialNumber);
        if (userBySerialNumber.length != 0) {
            return res.status(HttpStatus.CONFLICT).json({
                success: false,
                error: "Serial Number is taken"
            });
        }

        if (await userRepository.create(newUser) === null) {
            return res.status(HttpStatus.CONFLICT).json({
                success: false,
                error: "Could not create new User in data base"
            });
        }

        const token = await createToken(newUser, process.env.JWT_SECRET);

        return res.status(HttpStatus.OK).json({
            token: token,
            User: newUser
        });

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,

        });
    }
}

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
        } else
            throw (error);

        return res.status(HttpStatus.OK).json({
            success: true,
        });

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}


const utils = {login, register, registerRole};

export = utils;
