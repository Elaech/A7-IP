import {Router} from "express";
import {getAllUsers} from '../controllers';

const router = Router();

router.get('/', getAllUsers);
//router.post('/', userController.createUser);

export = router;