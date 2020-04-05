import HttpStatus from "http-status-codes";

import {createToken} from '../utils';

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