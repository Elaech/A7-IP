import HttpStatus from 'http-status-codes';
import {Router} from "express";

import {login, register, registerRole} from "../controllers";

const router = Router();


router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active'
    });
});

router.post('/login', login);
router.post('/register', register);
router.post('/register/role', registerRole);

export = router;