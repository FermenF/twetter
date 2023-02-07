import { Router } from "express";

import userController from "../controllers/user.controller";

const router = Router();

router.get('/:username', userController.showUserPost);

export default router;