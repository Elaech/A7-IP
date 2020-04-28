import HttpStatus from 'http-status-codes';
import {Router} from "express";



import {createPost,getPostByPostId,getPostList} from "../controllers"

const router = Router();


router.get('/', (req: any, res: any) => {
    return res.status(HttpStatus.OK).json({
        status: 'active'
    });
});

router.post('/', createPost);
router.get('/:postId',getPostByPostId);
router.post('/getPosts',getPostList);


export = router;