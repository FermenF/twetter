import { Router } from "express";
import auth from "../middleware/auth";
import postControllers from "../controllers/posts.controller";

const router = Router();

router.get('/', auth.checkAuth, postControllers.userPosts);
router.post('/new_post', auth.checkAuth, postControllers.addNewPosts);
router.post('/like_post', auth.checkAuth, postControllers.userLikePost);
router.post('/dislike_post', auth.checkAuth, postControllers.userDisLikePost);

export default router;