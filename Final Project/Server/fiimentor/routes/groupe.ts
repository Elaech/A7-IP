import HttpStatus from 'http-status-codes';
import {Router} from "express";

import {tutorGroupeList} from "../controllers";
import {login} from "../controllers/authController";

const router = Router();


router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active'
    });
});

router.get('/tutor_groupe_list', tutorGroupeList);

export=router;
