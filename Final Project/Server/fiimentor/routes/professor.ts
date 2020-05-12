import {Router} from "express";
import {getProfessorList} from "../controllers";

const router = Router();

router.get('/professor_list', getProfessorList);



export = router;