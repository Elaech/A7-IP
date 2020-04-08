import HttpStatus from "http-status-codes";
import {createConnection} from 'typeorm';
import {UserRepository} from '../Repositories/UserRepository'
import {createToken} from '../utils';
import {ProfessorRepository} from "../Repositories/ProfessorRepository";
import {StudentRepository} from "../Repositories/StudentRepository";
import {TutorRepository} from "../Repositories/Tutor";

async function login(req: any, res: any){
    try {
        const username = req.body.username;
        const password = req.body.password;
        let student : any =null;
        let professor : any =null;
        let tutor : any =null;
        createConnection().then(async connection => {
            const userRepository = new UserRepository(connection);
            const userByUserName = await userRepository.getByUsername(username);

            if (userByUserName.length)
            {
                const role=userByUserName[0].role;
                if (role.localeCompare("student")==0) {
                    const studentRepository = new StudentRepository(connection);
                    student = await studentRepository.getByUserId(userByUserName[0].id);
                }
                if (role.localeCompare("professor")==0){
                    const professorRepository = new ProfessorRepository(connection);
                    const tutorRepository = new TutorRepository(connection);
                    professor=await professorRepository.getByUserId(userByUserName[0].id);
                    tutor=await tutorRepository.getByProfessorId(professor[0].id);
                }
            }

            await connection.close();
            if (!userByUserName.length){
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    status: 'Invalid username'
                });
            }
            else{
                if(password.localeCompare(userByUserName[0].password)!=0){
                    return res.status(HttpStatus.UNAUTHORIZED).json({
                        success: false,
                        status: 'Invalid password'
                    });
                }
                else{
                    let payload : any;
                    let token : any;
                    if(student!=null){
                        payload={userByUserName,student};
                        token = await createToken(payload, process.env.JWT_SECRET);
                        return res.status(HttpStatus.OK).json({
                            token : token,
                            student : payload
                        });
                    }
                    if(professor!=null) {
                        if(tutor.length){
                            payload={userByUserName,professor,tutor};
                        }
                        else{
                            payload={userByUserName,professor};
                        }
                        token= await createToken(payload,process.env.JWT_SECRET);
                        return res.status(HttpStatus.OK).json({
                            token : token,
                            professor : payload
                        });
                    }
                    /* if(student==null && professor==null){
                        token = await createToken(userByUserName, process.env.JWT_SECRET);
                    }
                    return res.status(HttpStatus.OK).json({
                        token : token,
                        user : userByUserName
                    });*/
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