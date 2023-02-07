import { Router } from "express";
import authControllers from "../controllers/auth.controllers";

const router = Router();

router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.post('/logout', authControllers.logout);

export default router;