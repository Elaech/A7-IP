import HttpStatus from 'http-status-codes';
import {Router} from "express";



import {getPMessageByPMessageId} from "../controllers"

const router = Router();


router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active'
    });
});

router.get('/:pMessageId',getPMessageByPMessageId);


export = router;