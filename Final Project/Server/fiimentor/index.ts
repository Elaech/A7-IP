'use strict';
import "reflect-metadata";

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import HttpStatus from 'http-status-codes';
import logger from 'morgan';
import dotenv from 'dotenv'; // for config files
import path from 'path';


import router from "./routes";
import {requireAuth} from './middlewares';


//deciding the port based on development/production
const PORT = process.env.NODE_ENV === 'prod' ? 80 : 3000;
//in case NODE_ENV is not defined, set it to dev
process.env.NODE_ENV = process.env.NODE_ENV === 'prod' ? 'prod' : 'dev';
//setting the config files
dotenv.config({
    path: path.join(__dirname, 'configs',`${process.env.NODE_ENV}.env`),
});
console.log(path.join(__dirname, 'configs',`${process.env.NODE_ENV}.env`));

const app = express();


// TODO: connect to the database.


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(requireAuth());
app.use(logger('dev'));


app.use('/api', router);


// 404
app.use((req: any , res: any, next: any) => {
    return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Route ${req.url} Not found.` });
});

// 500 - Any server error
app.use((error: any, req: any, res: any, next: any) => {
    req.log.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error });
});

//server start listening to PORT
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
