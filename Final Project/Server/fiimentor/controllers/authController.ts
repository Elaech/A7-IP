import HttpStatus from "http-status-codes";

import {createToken} from '../utils';
import {error} from "util";
import {createConnection} from "typeorm";
import {User} from "../models/entities/User";
import {UserRepository} from "../Repositories/UserRepository";

async function login(req: any, res: any){
    try {
        // Mock user
        const user = {
            id: 1,
            username: 'teodor',
            email: 'teodor@gmail.com'
        };

        const username = req.body.username;
        const password = req.body.password;

        //serach in the database if user is existent


        // Creating a token to return to the client
        const token = await createToken(user, process.env.JWT_SECRET);
        //send the token to the client

        return res.status(HttpStatus.OK).json({
            token
        });

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