
import HttpStatus from 'http-status-codes';
import {createComment} from "../controllers";
import {Router} from "express";

const router = Router();


router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active'
    });
});

router.post('/',createComment);

export=router;
