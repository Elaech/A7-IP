import HttpStatus from "http-status-codes";
import {createConnection} from 'typeorm';
import {UserRepository} from '../Repositories/UserRepository'
import {createToken} from '../utils';
import {ProfessorRepository} from "../Repositories/ProfessorRepository";
import {StudentRepository} from "../Repositories/StudentRepository";
import {TutorRepository} from "../Repositories/Tutor";
import {error} from "util";
import {User} from "../models/entities/User";
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

async function register(req: any, res: any) {
    try {


        // return res.status(HttpStatus.OK).json();

        //const user = await req.db.User.find();
        const serialNumber = req.body.serialNumber;
        const username = req.body.username;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        let newUser = new User();


        let regexpEmail =
            new RegExp(/[a-zA-Z0-9_\\.\\+-]+@info.uaic.ro$/);

        let regexSerialNumber =
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

        createConnection().then(async connection => {
            const userRepository = new UserRepository(connection);

            const userByUserName = await userRepository.getByUsername(newUser.username);
            if (userByUserName.length != 0) {
                await connection.close();
                return res.status(HttpStatus.CONFLICT).json({
                    success: false,
                    error: "Username is taken"
                });
            }

            const userBySerialNumber = await userRepository.getBySerialNumber(newUser.serialNumber);
            if(userBySerialNumber.length!=0){
                await connection.close();
                return res.status(HttpStatus.CONFLICT).json({
                    success: false,
                    error: "Serial Number is taken"
                });
            }

            if (await userRepository.create(newUser) == null) {
                await connection.close();
                throw(error);
            }

            await connection.close();

            const token = await createToken(newUser, process.env.JWT_SECRET);
            return res.status(HttpStatus.OK).json({
                token: token,
                User: newUser
            });
        }).catch(error => {
            console.log(error);
        });


    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}


const utils = {login, register};

export = utils;
