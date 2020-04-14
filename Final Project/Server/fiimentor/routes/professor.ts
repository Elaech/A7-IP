import {Router} from "express";
import { professor_list } from "../controllers";

const router = Router();

router.get('/professor_list', professor_list);



export = router;