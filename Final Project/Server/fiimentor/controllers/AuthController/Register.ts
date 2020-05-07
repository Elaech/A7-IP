import HttpStatus from "http-status-codes";
import { User } from "../../models/entities/User";
import { UserRepository } from "../../Repositories/UserRepository";
import { createToken } from "../../utils";

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

const utils = {register};

export = utils;