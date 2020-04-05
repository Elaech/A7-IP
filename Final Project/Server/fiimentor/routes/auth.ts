import HttpStatus from 'http-status-codes';
import {Router} from "express";

import {login, register} from "../controllers";

const router = Router();


router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active'
    });
});

router.post('/login', login);
router.post('/register', register);

export = router;