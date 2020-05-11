import {Router} from "express";
import HttpStatus from 'http-status-codes';

import users from "./users";
import auth from "./auth";
import post from "./post";
import pmessage from "./pmessage";
import professor from "./professor";
import groupe from"./groupe";
import comment from './comment'

const router = Router();

router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active',
    });
});

router.use('/groupe',groupe);
router.use('/users', users);
router.use('/auth', auth);
router.use('/post',post);
router.use('/pmessage',pmessage);
router.use('/professor',professor);
router.use('/comment',comment);
export = router;