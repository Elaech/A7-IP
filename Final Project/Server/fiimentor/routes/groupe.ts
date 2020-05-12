
import HttpStatus from 'http-status-codes';
import {getGroupeList} from "../controllers";
import {Router} from "express";
import {tutorGroupeList} from "../controllers";

const router = Router();


router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active'
    });
});

router.get('/tutor_groupe_list', tutorGroupeList);
router.get('/faculty_groupe_list',getGroupeList);

export=router;
