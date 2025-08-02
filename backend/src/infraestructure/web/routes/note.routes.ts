import { Router } from "express";
import { noteController } from "../../../container";
import { authMiddleware } from "../../../container";

const router = Router();

router.get("", authMiddleware.authenticate, noteController.getNotes)
router.get("/:id", authMiddleware.authenticate, noteController.getById)
router.post("", authMiddleware.authenticate, noteController.create)
router.delete("/:id", authMiddleware.authenticate, noteController.delete)

export default router;