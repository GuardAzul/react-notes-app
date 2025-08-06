import { Router } from "express";
import { authMiddleware, userController } from "../../../container";

const router = Router();

router.get("/:id", userController.getById)
router.post('', userController.save)
router.post('/login', userController.login)
router.get('/auth/verify', authMiddleware.authenticate, userController.verify);
router.post('/logout', userController.logout);

export default router;
