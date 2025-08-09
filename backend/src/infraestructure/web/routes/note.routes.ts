import { Router } from "express";
import { noteController } from "../../../container";
import { authMiddleware } from "../../../container";

const router = Router();

router.get("", authMiddleware.authenticate, noteController.getNotes)
router.post("", authMiddleware.authenticate, noteController.create)
router.get("/title", authMiddleware.authenticate, noteController.getByTitle)
router.put("/:id", authMiddleware.authenticate, noteController.update)
router.get("/:id", authMiddleware.authenticate, noteController.getById)
router.delete("/:id", authMiddleware.authenticate, noteController.delete)

export default router;