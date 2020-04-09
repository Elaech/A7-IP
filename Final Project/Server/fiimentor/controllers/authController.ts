import HttpStatus from "http-status-codes";
import {createConnection} from 'typeorm';
import {createToken} from '../utils';
import {UserRepository} from '../Repositories/UserRepository'
import {ProfessorRepository} from "../Repositories/ProfessorRepository";
import {StudentRepository} from "../Repositories/StudentRepository";
import {TutorRepository} from "../Repositories/TutorRepository";
import {Student} from '../models/entities/Student';
import { Professor} from "../models/entities/Professor";
import {Tutor} from '../models/entities/Tutor';

async function login(req: any, res: any){
    try {
        const username = req.body.username;
        const password = req.body.password;
        createConnection().then(async connection => {
            const userRepository = new UserRepository(connection);
            const userByUserName = await userRepository.getByUsername(username);
            if (!userByUserName.length){
                await connection.close();
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'Invalid username'
                });
            }
            else{
                if(password.localeCompare(userByUserName[0].password)!=0){
                    await connection.close();
                    return res.status(HttpStatus.UNAUTHORIZED).json({
                        success: false,
                        status: 'Invalid password'
                    });
                }
                else{
                    const studentRepository = new StudentRepository(connection);
                    const professorRepository = new ProfessorRepository(connection);
                    let student : Student[]=await studentRepository.getByUserId(userByUserName[0].id);
                    let professor : Professor[]=await professorRepository.getByUserId(userByUserName[0].id);
                    let tutor : Tutor[];
                    let payload : any;
                    let token : any;
                    if(student.length){
                        payload={userByUserName,student};
                        token = await createToken(payload, process.env.JWT_SECRET);
                        await connection.close();
                        return res.status(HttpStatus.OK).json({
                            token : token,
                            student : payload
                        });
                    }
                    if(professor.length) {
                        const tutorRepository = new TutorRepository(connection);
                        tutor=await tutorRepository.getByProfessorId(professor[0].id);
                        if(tutor.length){
                            payload={userByUserName,professor,tutor};
                        }
                        else{
                            payload={userByUserName,professor};
                        }
                        token= await createToken(payload,process.env.JWT_SECRET);
                        await connection.close();
                        return res.status(HttpStatus.OK).json({
                            token : token,
                            professor : payload
                        });
                    }
                }
            }
        }).catch (error => {
            console.log(error);
        })


        //if something goes wrong throw an error ("error..a user is already registered")
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}

function register(req:any, res:any){
    try {
        //const users = await req.db.User.find({});

        // return res.status(HttpStatus.OK).json();
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}

const utils = {login, register};

export = utils;
