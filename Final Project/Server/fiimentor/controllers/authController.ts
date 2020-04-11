import HttpStatus from "http-status-codes";
import { getConnection } from 'typeorm';
import { createToken } from '../utils';
import { UserRepository } from '../Repositories/UserRepository'
import { ProfessorRepository } from "../Repositories/ProfessorRepository";
import { StudentRepository } from "../Repositories/StudentRepository";
import { TutorRepository } from "../Repositories/TutorRepository";
import { Student } from '../models/entities/Student';
import { Professor } from "../models/entities/Professor";
import { Tutor } from '../models/entities/Tutor';
import { User } from "../models/entities/User";
import { error } from "console";

async function login(req: any, res: any) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const userRepository = new UserRepository();
        const userByUserName = await userRepository.getByUsername(username);

        if (!userByUserName.length) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                status: 'Invalid username'
            });
        }
        else {
            console.log(userByUserName[0].id);
            if (password.localeCompare(userByUserName[0].password) !== 0) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'Invalid password'
                });
            }
            else {
                const studentRepository = new StudentRepository();
                const professorRepository = new ProfessorRepository();

                const student: Student[] = await studentRepository.getByUserId(userByUserName[0].id);
                const professor: Professor[] = await professorRepository.getByUserId(userByUserName[0].id);
                let payload: Object;
                let token: any;

                if (student.length) {
                    console.log('student');
                    payload = { userByUserName, student };
                    token = await createToken(payload, process.env.JWT_SECRET);
                    return res.status(HttpStatus.OK).json({
                        token: token,
                        student: payload
                    });
                }

                if (professor.length) {
                    const tutorRepository = new TutorRepository();
                    const tutor: Tutor[] = await tutorRepository.getByProfessorId(professor[0].id);

                    if (tutor.length) {
                        payload = { userByUserName, professor, tutor };
                    }
                    else {
                        payload = { userByUserName, professor };
                    }
                    token = await createToken(payload, process.env.JWT_SECRET);
                    return res.status(HttpStatus.OK).json({
                        token: token,
                        professor: payload
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
                error: "Username not valid",
            });
        }
        newUser.username = username;

        if (password.toString().length < 5 || password.toString().length > 50) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Password not valid",
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
                error: "First Name not valid",
            });
        }
        newUser.firstName = firstName;

        if (lastName.toString().length < 3 || lastName.toString().length > 50) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Last Name not valid",
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
            await getConnection().close();
            return res.status(HttpStatus.CONFLICT).json({
                success: false,
                error: "Serial Number is taken"
            });
        }

        if (await userRepository.create(newUser) === null) {
            throw (error);
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

const utils = { login, register };

export = utils;