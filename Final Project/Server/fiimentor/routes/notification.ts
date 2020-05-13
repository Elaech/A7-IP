import HttpStatus from 'http-status-codes';
import {Router} from "express";
import {getNotification} from "../controllers"

const router = Router();

router.get('/',getNotification);


export = router;