import { Router } from "express";
import userRouting from "./user.routing";
import authRouting from "./auth.routing";
import postRouting from "./posts.routing";

const router = Router();
router.use('', userRouting);
router.use('/auth', authRouting);
router.use('/posts', postRouting);

export default router;