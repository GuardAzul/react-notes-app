import { Router } from "express";
import { userController } from "../../../container";

const router = Router();

router.get("/:id", userController.getById)
router.post('', userController.save)
router.post('/login', userController.login)

export default router;
